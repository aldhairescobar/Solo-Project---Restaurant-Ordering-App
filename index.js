import { menuArray } from './data.js'

document.addEventListener('click', function(e){
  if (e.target.id === 'product-btn'){
    console.log(e.target.dataset.ctaProduct)
  }
})

function renderHtmlProducts(){

  let productsHtml = ''

  menuArray.forEach(function(product){
    productsHtml += `
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

  let yourOrderHtml = `
  <div class="container-your-order hidden">
      <h2>Your order</h2>
      <div id="your-order-products">
          <div class="your-order-item">
              <div>
                  <p class="your-order-product-name">Pizza</p>
                  <button class="remove-btn">remove</button>
              </div>
              <span class="your-order-item-price">$14</span>
          </div>
      </div>
      <div class="section-total-price">
          <p>Total price:</p><span class="total-price">$26</span>
      </div>
      <button class="complete-order-btn">Complete order</button>
    </div>
  `

  let feedHtml = `
    ${productsHtml}
    ${yourOrderHtml}
  `

  return feedHtml

}


renderHtmlProducts()

function render(){
  document.getElementById('feed').innerHTML = renderHtmlProducts() 
}

render()