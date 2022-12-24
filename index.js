import { menuArray } from './data.js'

const productsEl = document.getElementById('products')

document.addEventListener('click', function(e){
  if (e.target.id === 'product-btn'){
    console.log(e.target.dataset.ctaProduct)
  }
})

function renderHtmlProducts(){

  let feedHtml = ''

  menuArray.forEach(function(product){
    feedHtml += `
    <div class="product" data-product="${product.id}">
        <div class="product-info">
            <img src="./images/${product.name}.png">
            <div>
                <h2 class="product-info-name">${product.name}</h2>
                <p class="product-info-description">${product.ingredients}</p>
                <p class="product-info-price">$${product.price}</p>
            </div>
        </div>
        <button id="product-btn" class="product-cta" data-cta-product="${product.id}">
            +
        </button>
    </div>
    `
  })

  productsEl.innerHTML = feedHtml

}


renderHtmlProducts()
