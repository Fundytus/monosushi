window.addEventListener('load', () => {
    getAllCategories()
    welcomeUser()
})

const getAllCategories = async () => {
    const url = 'http://localhost:3001/api/v1/categories'
    await fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "authorization": localStorage.getItem('token')

            }
        })
        .then(response => response.json())
        .then((data) => {
            let categories = data
            const renderMenu = document.querySelector('#renderMenu')
            renderMenu.classList.add('d-flex', 'flex-row')
            categories.map((category) => {
                
                let li = document.createElement('li')
                li.classList.add('nav-item', 'hover-border')
                const a = document.createElement('a')
                a.classList.add('nav-link')
                a.setAttribute('aria-current', 'page')
                    a.setAttribute('href', 'productByCategory.html')
                const div = document.createElement('div')
                const img = document.createElement('img')
                const span = document.createElement('span')
                span.classList.add('fw-bold')
                img.src = `uploads/${JSON.stringify(category.catImg).split('\\')[4].slice(0,-1)}`
                span.innerHTML = category.name

                a.addEventListener('click', async e => {
                    e.preventDefault()
                    document.cookie = `categoryId=${category._id};`
                     localStorage.setItem('categoryDescr', category.catDesc)
                    window.location.href = 'productByCategory.html'
                   
                })
                a.appendChild(div)
                div.appendChild(img)
                div.appendChild(span)
                li.appendChild(a)
                renderMenu.appendChild(li)
            });
        })
}