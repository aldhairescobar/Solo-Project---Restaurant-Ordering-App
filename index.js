import { menuArray } from './data.js'

let orderProducts = []
let totalPrice = 0

document.addEventListener('click', function(e){
  if (e.target.id === 'product-btn'){
    handleProductClick(Number(e.target.dataset.ctaProduct))
  }
  if (e.target.dataset.remove){
    handleRemoveClick(Number(e.target.dataset.remove))
  }
})

function handleProductClick(productId){

  menuArray.filter(function(item){

    if (item.id === productId){
      totalPrice = totalPrice + item.price
      const productObj = {
        name: item.name,
        price: item.price,
        id: item.id
      }

      orderProducts.push(productObj)
    }
  })

  render()
}

function handleRemoveClick(productId){

  const productIndex = orderProducts.findIndex(function(product){
    return product.id === productId
  })


  orderProducts.forEach(function(product, i){
    if (productIndex === i){
      totalPrice = totalPrice - product.price
    }
  })

  orderProducts.splice(productIndex, 1)

  /* const newObj = orderProducts.filter(function(product){
    return product.id != productId
  })

  console.log(newObj) */
  render()
}

function feedHtml(){

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

  let orderProductsHtml = ''

  orderProducts.forEach(function(product){
    orderProductsHtml += `
    <div class="your-order-item">
        <div>
            <p class="your-order-product-name">${product.name}</p>
            <button class="remove-btn" data-remove="${product.id}">remove</button>
        </div>
        <span class="your-order-item-price">$${product.price}</span>
    </div>
    `
  })

  let yourOrderClass = ''

  if(orderProducts.length > 0){
    yourOrderClass = 'block'
  }

  let yourOrderHtml = `
  <div id="your-order-box" class="container-your-order ${yourOrderClass}">
      <h2>Your order</h2>
      <div id="your-order-products">
          ${orderProductsHtml}
      </div>
      <div class="section-total-price">
          <p>Total price:</p><span class="total-price">$${totalPrice}</span>
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

function render(){
  document.getElementById('feed').innerHTML = feedHtml() 
}

render()