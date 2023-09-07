window.addEventListener('load', () => {
    welcomeUser()
    getProducts()
})

let cartArr = []


let count = 1
let total;

const url = 'http://localhost:3001/api/v1/products'
const getProducts = async () => {

    await fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "authorization": localStorage.getItem('token')

            }
        })
        .then(response => response.json())
        .then((data) => {
            let products = data
            if (localStorage.getItem('order')) {
                cartArr = JSON.parse(localStorage.getItem('order'))
            }
            let rowDiv = document.createElement('div')
            rowDiv.classList.add('row')
            products.map((product) => {
                const card = document.createElement('div')
                card.classList.add('card', 'm-2', 'border')
                const productImg = document.createElement('div')
                productImg.classList.add('product-img')
                const image = document.createElement('div')
                image.classList.add('image')
                productImg.appendChild(image)
                const img = document.createElement('img')
                img.src = `uploads/${JSON.stringify(product.productImg).split('\\')[4].slice(0,-1)}`
                img.classList.add('card-img-top', 'cardImg')


                const productName = document.createElement('div')
                productName.classList.add('product-name')
                productName.innerHTML = product.name
                const productInfo = document.createElement('div')
                productInfo.classList.add('product-info')
                const productIngredients = document.createElement('div')
                productIngredients.classList.add('product-ingredients')
                productIngredients.innerHTML = product.ingredients ? product.ingredients : ''
                const productWeight = document.createElement('div')
                productWeight.classList.add('product-weight')
                productWeight.innerHTML = product.weight ? `${product.weight}g` : ''
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

                productInfo.appendChild(productIngredients)
                productInfo.appendChild(productWeight)

                img.addEventListener('click', async e => {
                    e.preventDefault()
                    localStorage.setItem('productId', product._id)
                    window.location.href = 'productDetail.html'

                })
                increment.addEventListener('click', () => {
                    count += 1
                    // cartArr.push(product)
                    productQty.innerHTML = count
                    TotalPrice()
                })
                decrement.addEventListener('click', () => {
                    if (count > 1) {
                        //       cartArr = cartArr.filter(item => item !== product)
                        // count -= 1
                        productQty.innerHTML = count
                        TotalPrice()
                    } else {
                        count = 1
                    }
                })
                let totalCount = 0
                const bottom = document.createElement('div')
                bottom.classList.add('card-bottom')
                const price = document.createElement('div')
                price.classList.add('product-price')
                price.innerHTML = `$${product.price}`
                const addToCart = document.createElement('a')
                addToCart.classList.add('btn-Order')
                addToCart.innerHTML = 'Add to cart'

                const TotalPrice = () => {
                    total -= Number(price.innerHTML.substring(1))
                    let priceTotal = Number(product.price) * Number(productQty.innerHTML)
                    total += Number(priceTotal)
                    price.innerHTML = `$${priceTotal}`
                        localStorage.setItem('totalPrice', total)
                    product.price = priceTotal
                    product.qty = productQty.innerHTML
                }
                const lblCartCount = document.querySelector('#lblCartCount')
                if (localStorage.getItem('basketAmount')) {
                    lblCartCount.innerHTML = localStorage.getItem('basketAmount')
                }
                addToCart.addEventListener('click', () => {
                    cartArr.push(product)
                    localStorage.setItem('order', JSON.stringify(cartArr))
                    totalCount = Number(product.qty)
                    lblCartCount.innerHTML = totalCount + count
                    localStorage.setItem('basketAmount', lblCartCount.innerHTML)

                })
                bottom.appendChild(price)
                bottom.appendChild(productCount)
                bottom.appendChild(addToCart)
                image.appendChild(img)
                card.appendChild(image)
                card.appendChild(productName)
                card.appendChild(productInfo)
                card.appendChild(bottom)
                rowDiv.appendChild(card)
                const productsDiv = document.querySelector('#productsDiv')
                productsDiv.appendChild(card)
            });
        })
}
const showCart = document.querySelector('#showCart')
showCart.addEventListener('click', () => {
    localStorage.setItem('order', JSON.stringify(cartArr))
    window.location.href = './basket.html'
})