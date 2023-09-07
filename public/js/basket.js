window.addEventListener('load', () => {
    welcomeUser()
    getCustomerCart()
})
const cartDiv = document.querySelector('#cartDiv')
const totalPrice = document.querySelector('#totalPrice')
let cartArr = JSON.parse(localStorage.getItem('order'))
const getCustomerCart = () => {
    let total = 0
    let count = 1
    

    const lblCartCount = document.querySelector('#lblCartCount')
    lblCartCount.innerHTML = localStorage.getItem('basketAmount')

    cartArr.map((product) => {

        const cardDiv = document.createElement('div')
        cardDiv.classList.add('cardOrder', 'mb-md-3', 'd-flex', '.flex-row')
        const imgDiv = document.createElement('div')
        imgDiv.classList.add('col-md-6')
        const dataDiv = document.createElement('div')
        dataDiv.classList.add('col-md-8')

        const img = document.createElement('img')
        img.classList.add('col-10', 'cardImg')

        img.src = `../uploads/${JSON.stringify(product.productImg).split('\\')[4].slice(0,-1)}`
        imgDiv.appendChild(img)
        cardDiv.appendChild(imgDiv)
        cardDiv.appendChild(dataDiv)
        // img.classList.add('col-4')
        const h3 = document.createElement('h4')
        h3.innerHTML = product.name
        h3.classList.add('card-title', 'fw-bold', 'pt-3')
        dataDiv.appendChild(h3)
        const rightDiv = document.createElement('div')
        rightDiv.classList.add('col-md-1', 'pt-3')
        const multiDiv = document.createElement('div')
        multiDiv.classList.add('d-flex')
        const price = document.createElement('div')
        price.innerHTML = `$${product.price}`
        price.classList.add('ms-5', 'pt-1', 'fs-4')

        const productCount = document.createElement('div')
        productCount.classList.add('product-count')
        const decrement = document.createElement('button')
        decrement.classList.add('decrement')
        decrement.textContent = '-'
        const productQty = document.createElement('div')
        productQty.classList.add('product-qty', 'pt-3')
        productQty.innerHTML = product.qty
        total += Number(product.price)
        const increment = document.createElement('button')
        increment.classList.add('increment')
        increment.textContent = '+'

        productCount.appendChild(decrement);
        productCount.appendChild(productQty);
        productCount.appendChild(increment);
        increment.addEventListener('click', () => {
            count += 1
            productQty.innerHTML = count
            TotalPrice()
        })
        decrement.addEventListener('click', () => {
            if (count > 1) {
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
            localStorage.setItem('order', JSON.stringify(cartArr))
        }


        const deleteBtn = document.createElement('i')
        deleteBtn.classList.add('fa-regular', 'fa-trash-can', 'fs-4', 'm-2', 'ms-4')
        deleteBtn.addEventListener('click', () => {
            cartArr = cartArr.filter(item => item !== product)
            localStorage.setItem('order', JSON.stringify(cartArr))
            localStorage.setItem('basketAmount', lblCartCount.innerHTML - productQty.innerHTML)
            cartDiv.innerHTML = ''
            getCustomerCart()
        })
        multiDiv.appendChild(productCount)
        multiDiv.appendChild(price)
        multiDiv.appendChild(deleteBtn)

        rightDiv.appendChild(multiDiv)

        cardDiv.appendChild(rightDiv)
        cartDiv.appendChild(cardDiv)
    })
    localStorage.setItem('order', JSON.stringify(cartArr))
    localStorage.setItem('basketAmount', lblCartCount.innerHTML)
    totalPrice.innerHTML = `Total price : $${total}`
    cartDiv.appendChild(totalPrice)
}

const checkOut = document.querySelector('#checkOutBtn')
checkOut.addEventListener('click', () => {
    cartDiv.innerHTML = ''
    checkOut.style.display = 'none'

})

const submitOrder = async () => {
    const url = 'http://localhost:3001/api/v1/orders'
    cartArr.qty = localStorage.getItem('totalPrice')
    await fetch(url, {
            method: "POST",
            body: JSON.stringify(cartArr),
            headers: {
                "authorization": localStorage.getItem('token'),
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
             cartDiv.innerHTML = ''
             lblCartCount.innerHTML=0
             cartArr=[]
                 localStorage.setItem('order', JSON.stringify(cartArr))
                 localStorage.setItem('basketAmount', lblCartCount.innerHTML)
        })
}