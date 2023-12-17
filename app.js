const row = document.querySelector('.row')
const sepet_body = document.querySelector(".offcanvas-body")
const sepet = []
const input = document.getElementById('input')



get_item_from_locale_storage()

fetch("https://fakestoreapi.com/products?limit=20")
.then(res => res.json())
.then(data => {
  console.log(data)
  for(let i =0; i < data.length; i++){
    const product = data[i]
    const card = document.createElement('div')
    const card_header = document.createElement('div')
    const card_body = document.createElement('div')
    const card_footer = document.createElement('div')
    const title = document.createElement('h1')
    const description = document.createElement('p')
    const image = document.createElement('img')
    const list = document.createElement('ul')
    const list_item = document.createElement('li')
    const price = document.createElement('p')
    const btn = document.createElement('btn')
    const category = document.createElement('p')

    title.textContent = product.title
    description.textContent = product.description
    image.src = product.image
    price.textContent =`$${product.price}`
    category.textContent = product.category
    btn.textContent = 'sepete ekle'

    card_header.appendChild(title)
    card_body.appendChild(description)
    list_item.appendChild(category)
    list.appendChild(list_item)
    card_body.appendChild(image)
    card_body.appendChild(list)
    card_footer.appendChild(price)
    card_footer.appendChild(btn)

    card.appendChild(card_header)
    card.appendChild(card_body)
    card.appendChild(card_footer)
    row.appendChild(card)

    title.classList.add('card-title')
    price.classList.add('card-text')
    image.classList.add('card-img',"w-50")
    description.classList.add('card-text')
    btn.classList.add('btn',"btn-danger")
    list.classList.add('list-group')
    list_item.classList.add('list-group-item')
    card_header.classList.add('card-header')
    card_body.classList.add('card-body')
    card_footer.classList.add('card-footer')
    card.classList.add('col-md-3', 'card')

    card.id = product.id

    btn.addEventListener('click',(event) => {
      let clicked_card_id = event.target.parentElement.parentElement.id
      console.log(clicked_card_id)
      fetch(`https://fakestoreapi.com/products/${clicked_card_id}`)
      .then(res => res.json())
      .then(data => {
      sepet.push(data)
      })
      console.log(sepet.length)
      console.log(sepet)
      set_item_to_locale_storage(sepet)


      sepet.forEach(item => {
        const wrapper = document.createElement('div')
        
        wrapper.innerHTML = `
          <div class="d-flex justify-content-between align-items-center">
            <h5>${item.title}</h5>
            <h5>$${item.price}</h5>

            <div class="sepet-img">
              <img src="${item.image}" class="w-100"/>
            </div>
          </div>
        `
        sepet_body.appendChild(wrapper)
        
      })


    })

  }


  console.log(data)
  input.addEventListener('input', () => {
    const card = document.querySelectorAll('.card')
    const value = input.value
    console.log(value)

    card.forEach(item => {
      const titles = item.childNodes[0].textContent
      const descs = item.childNodes[1].textContent
      if (titles.includes(value) || descs.includes(value) ){
        item.classList.add('d-block')
      }else{
        item.classList.add('d-none')
      }
    })
  })


})



function get_item_from_locale_storage(){
  const products = JSON.parse(localStorage.getItem('products'))
  console.log(products)
  products.forEach(item =>{
    const wrapper = document.createElement('div')
    wrapper.innerHTML = wrapper.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h5>${item.title}</h5>
          <h5>$${item.price}</h5>
        </div>

        <div class="sepet-img">
          <img src="${item.image}" class="w-100"/>
        </div>
      </div>
  `
    sepet_body.appendChild(wrapper)
  })

}


console.log(sepet_body.firstElementChild)

function set_item_to_locale_storage(urunler){
  localStorage.setItem('products',JSON.stringify(urunler))
}
