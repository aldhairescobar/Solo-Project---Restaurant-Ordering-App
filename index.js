import { menuArray } from './data.js'
const cardDetailsForm = document.getElementById('form')

let orderProducts = []
let totalPrice = 0

document.addEventListener('click', function(e){
  if (e.target.id === 'product-btn'){
    handleProductClick(Number(e.target.dataset.ctaProduct))
  }
  if (e.target.dataset.remove){
    handleRemoveClick(Number(e.target.dataset.remove))
  }
  if (e.target.id === 'complete-order-btn'){
    handleCompleteOrderClick()
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

function handleCompleteOrderClick(){
  document.getElementById('modal').style.display = 'block'
}

/* handle form */
cardDetailsForm.addEventListener('submit', function(e){
  e.preventDefault()

  const formData = new FormData(cardDetailsForm)
  const userName = formData.get('userName')
  handlePayClick(userName)
})

function handlePayClick(name){

  orderProducts = []
  totalPrice = 0
  document.getElementById('modal').style.display = 'none'
  const thanksMessage = `
    <div class="thanks-message">
      <p>Thanks, ${name}! Your order is on its way!</p>
    </div>`

  document.getElementById('container-app').innerHTML += thanksMessage
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
      <button class="complete-order-btn" id="complete-order-btn">Complete order</button>
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