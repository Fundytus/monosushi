window.addEventListener('load', async () => {
    welcomeUser()
    getProduct()
})
const url = 'http://localhost:3001/api/v1/product'
let cartArr = JSON.parse(localStorage.getItem('order'))
let count = 1
let total = 0


const getProduct = async (prodId) => {
prodId = localStorage.getItem('productId')
    await fetch(`${url}/${prodId}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "authorization": localStorage.getItem('token')

            }
        })
        .then(response => response.json())
        .then((data) => {
            let product = data
                let rowDiv = document.createElement('div')
                rowDiv.classList.add('mb-md-5', 'pt-md-2', 'd-flex', 'flex-wrap', 'justify-content-center')
                    const card = document.createElement('div')
                    card.classList.add('m-2', 'cardProductDetail', 'd-flex')
                    const productImg = document.createElement('div')
                    productImg.classList.add('productView-img')
                    const imageDetail = document.createElement('div')
                    imageDetail.classList.add('imageDetail')
                    const img = document.createElement('img')
                    img.src = `../uploads/${JSON.stringify(product.productImg).split('\\')[4].slice(0,-1)}`
                    img.classList.add('card-img-top', 'cardImg')
                    const rightBlock = document.createElement('div')
                    rightBlock.classList.add('right-block')
                    const productName = document.createElement('div')
                    productName.classList.add('productDetail-name')
                    productName.innerHTML = product.name
                    const spanIngredients = document.createElement('span')
                    spanIngredients.textContent = 'Ingredients: '
                    const productIngredients = document.createElement('div')
                    productIngredients.classList.add('productDetail-ingredients')
                    productIngredients.appendChild(spanIngredients)
                    productIngredients.innerHTML += product.ingredients ? product.ingredients : ''
                    const spanWeight = document.createElement('span')
                    spanWeight.textContent = 'Weight: '
                    const productWeight = document.createElement('div')
                    productWeight.classList.add('productDetail-weight')
                    productWeight.appendChild(spanWeight)
                    productWeight.innerHTML += product.weight ? `${product.weight}g` : ''

                    const bottom = document.createElement('div')
                    bottom.classList.add('cardDetail-bottom')
                    const price = document.createElement('div')
                    price.classList.add('productDetail-price')
                    price.innerHTML = `$${product.price}`

                    const productCount = document.createElement('div')
                    productCount.classList.add('product-count')
                    const decrement = document.createElement('button')
                    decrement.classList.add('decrement')
                    decrement.textContent = '-'
                    const productQty = document.createElement('div')
                    productQty.classList.add('product-qty', 'pt-3')
                    productQty.innerHTML = 1
                    total += Number(product.price)
                    const increment = document.createElement('button')
                    increment.classList.add('increment')
                    increment.textContent = '+'

                    productCount.appendChild(decrement);
                    productCount.appendChild(productQty);
                    productCount.appendChild(increment);

                    const addToCart = document.createElement('a')
                    addToCart.classList.add('btnDetail-Order')
                    addToCart.innerHTML = 'Add to cart'

      let totalCount = 0
                    increment.addEventListener('click', () => {
                        count += 1
                        // cartArr.push(product)
                        productQty.innerHTML = count
                        TotalPrice()
                    })
                    decrement.addEventListener('click', () => {
                        if (count > 1) {
                            // cartArr = cartArr.filter(item => item !== product)
                            count -= 1
                            productQty.innerHTML = count
                            TotalPrice()
                        } else {
                            count = 1
                        }
                    })
                    const TotalPrice = () => {
                        total -= Number(price.innerHTML.substring(1))
                        let priceTotal = Number(product.price) * Number(productQty.innerHTML)
                        total += Number(priceTotal)
                        price.innerHTML = `$${priceTotal}`
                        localStorage.setItem('totalPrice', total)
                        product.qty = productQty.innerHTML
                      
                        console.log(productQty);
                    }
                    const lblCartCount = document.querySelector('#lblCartCount')
                      if (localStorage.getItem('basketAmount')) {
                          lblCartCount.innerHTML = localStorage.getItem('basketAmount')
                      }
                    addToCart.addEventListener('click', () => {
                        cartArr.push(product)
                        lblCartCount.innerHTML = count  
                        localStorage.setItem('order', JSON.stringify(cartArr))
                          lblCartCount.innerHTML = totalCount + count
                          localStorage.setItem('basketAmount', lblCartCount.innerHTML)
                    })
                    // removeFromCart.addEventListener('click', () => {
                    //     cartArr = cartArr.filter(item => item !== product)
                    //     count -= 1
                    //     lblCartCount.innerHTML = count

                    //     addToCart.hidden = false
                    //     removeFromCart.hidden = true

                    // })
                    bottom.appendChild(price)
                    bottom.appendChild(productCount)
                    bottom.appendChild(addToCart)
                    imageDetail.appendChild(img)
                    productImg.appendChild(imageDetail)
                    card.appendChild(productImg)
                    rightBlock.appendChild(productName)
                    rightBlock.appendChild(productIngredients)
                    rightBlock.appendChild(productWeight)
                    rightBlock.appendChild(bottom)
                    card.appendChild(rightBlock)
                    rowDiv.appendChild(card)
                    const productsDiv = document.querySelector('#productDetail')
                    productsDiv.appendChild(card)
                })
}

const showCart = document.querySelector('#showCart')
showCart.addEventListener('click', () => {
    localStorage.setItem('order', JSON.stringify(cartArr))
    window.location.href = './basket.html'
})