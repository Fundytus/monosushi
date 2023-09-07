const url = 'http://localhost:3001/api/v1/products'
window.addEventListener('load', () => {
	getProducts()
	getAllCategories()
	welcomeUser()
})
const select = document.querySelector('#categorySelect');
const editSelect = document.querySelector('#catEditSelect');
const message = document.querySelector('#message')
document.body.addEventListener('click', () => {
	showMessgae(true, '', '')
});

function AddProduct() {
	let productForm = document.querySelector('#productForm');
	productForm.style.display = 'block';
}

const getAllCategories = () => {
	const url = 'http://localhost:3001/api/v1/categories'
	fetch(url, {
			method: 'GET',
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"authorization": localStorage.getItem('token')
			}
		})
		.then(response => response.json())
		.then((data) => {
			let cats = data
			cats.map((cat) => {
				const option = document.createElement('option')
				option.innerHTML = cat.name
				option.value = cat._id
				select.appendChild(option)
				const editOption = document.createElement('option')
				editOption.innerHTML = cat.name
				editOption.value = cat._id
				editSelect.appendChild(editOption);
			});

		})
}


const getProducts = () => {
	const url = 'http://localhost:3001/api/v1/products'

	const tdody = document.querySelector('#tbody');
	tdody.innerHTML = ''
	fetch(url, {
			method: 'GET',
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"authorization": localStorage.getItem('token')
			}
		})
		.then(response => response.json())
		.then((data) => {
			let products = data
			products.map((product) => {
				tbody.appendChild(createProductTable(product));
			});
		})
}

const createProductTable = (product) => {
	const priceP = document.createElement('p')
	priceP.innerHTML = product.price ? `$${product.price}` : ''
	const ingredients = document.createElement('p')
	ingredients.innerHTML = product.ingredients ? `${product.ingredients}` : ''
	const weight = document.createElement('p')
	weight.innerHTML = product.weight ? `${product.weight}` : ''
	const productNmP = document.createElement('p')
	const editProductTxt = document.querySelector('#editProductTxt')
	const editPriceTxt = document.querySelector('#editPriceTxt')
	const editIngred = document.querySelector('#editProductIngred')
	const editWeight = document.querySelector('#editProductWeight')
	const img = document.createElement('img')
	if (product.productImg) {
		const imgPath = `../uploads/${JSON.stringify(product.productImg).split('\\')[4].slice(0,-1)}`
		img.src = imgPath;
		img.classList.add('smCatImg')
	}
	productNmP.innerHTML = `${product.name}`;
	let td2 = document.createElement('TD');
	td2.append(productNmP)
	let td3 = document.createElement('TD');
	td3.append(ingredients)
	let td4 = document.createElement('TD');
	td4.append(weight)
	let td5 = document.createElement('TD');
	td5.append(priceP)
	const editBtn = document.createElement('button')
	editBtn.classList.add('btn', 'btn-success', 'm-2')
	editBtn.innerHTML = 'Edit'
	editBtn.setAttribute('data-bs-target', '#editModal')
	editBtn.setAttribute('data-bs-toggle', 'modal')
	editBtn.addEventListener('click', () => {
		editProductTxt.value = productNmP.innerHTML
		const price = priceP.innerHTML
		editPriceTxt.value = priceP.innerHTML.slice(1, price.length)
		editSelect.value = product.categoryId
		editWeight.value = weight.innerHTML
		editIngred.value = ingredients.innerHTML
		const editInput = document.querySelector('#editProductImg')
		const saveChangesBtn = document.createElement('button')
		saveChangesBtn.classList.add('btn', 'btn-success')
		saveChangesBtn.innerHTML = 'Save Changes'
		saveChangesBtn.setAttribute('data-bs-dismiss', 'modal')
		const saveChangesDiv = document.querySelector('#saveChangesDiv')
		saveChangesDiv.replaceChildren(saveChangesBtn)
		saveChangesBtn.addEventListener('click', () => {
			const editForm = document.querySelector('#editForm')
			const formData = new FormData(editForm)
			if (product.productImg)
				formData.append('productImg', (editInput.value != '') ? editInput.value : product.productImg)
			updateProduct(formData, product._id)
			productNmP.innerHTML = document.querySelector('#editProductTxt').value
			priceP.innerHTML = `$${document.querySelector('#editPriceTxt').value}`
			ingredients.innerHTML = document.querySelector('#editProductIngred').value
			weight.innerHTML = document.querySelector('#editProductWeight').value
			if (editInput.value) img.src = `../uploads/${JSON.stringify(editInput.value).split('\\')[4].slice(0,-1)}`
		})
	})
	let tr = document.createElement('TR');
	//create delete button
	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('btn', 'btn-danger')
	deleteBtn.innerHTML = 'Delete'
	deleteBtn.addEventListener('click', () => {
		if (confirm('Are you sure to delete this Product?')) {
			deleteProduct(product._id)
			tr.remove()
		}
	})
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	let td6 = document.createElement('TD');
	let td7 = document.createElement('TD');
	td6.appendChild(img);
	tr.appendChild(td6);
	td7.appendChild(editBtn);
	tr.appendChild(td7)
	td7.appendChild(deleteBtn);
	tr.appendChild(td7)

	return tr
}

const deleteProduct = async (productId) => {
	await fetch(`${url}/${productId}`, {
		method: "Delete",
		headers: {
			"authorization": localStorage.getItem('token')
		}
	})
	showMessgae(false, 'alert-success', 'Product deleted Successfuly!')
}

const updateProduct = async (formData, productId) => {
	await fetch(`${url}/${productId}`, {
			method: "PATCH",
			body: formData,
			headers: {
				"authorization": localStorage.getItem('token')
			}
		})
		.then(response => response.json())
		.then(json => {
			console.log(json)
			showMessgae(false, json.product ? 'alert-success' : 'alert-danger', json.message)
		})
}

const productForm = document.querySelector('#productForm')
productForm.addEventListener('submit', async e => {
	e.preventDefault()
	if (validateProduct) {
		const formData = new FormData(productForm)
		const input = document.querySelector('#productImg')
		formData.append('productImg', input ?.value)

		const select = document.querySelector('#categorySelect')
		formData.append('categoryId', select ?.value)
		console.log(formData);
		await fetch(url, {
				method: "POST",
				body: formData,
				headers: {
					"authorization": localStorage.getItem('token')
				}
			})
			.then(response => response.json())
			.then(json => {
				console.log(json)
				//if product saved
				if (!json.product) {
					showMessgae(false, 'alert-danger', json.message)
				} else {
					for (const element of productForm.elements) {
						element.value = ''
					}
					showMessgae(false, 'alert-success', json.message)
					document.querySelector('#tbody').appendChild(createProductTable(json.product))
				}
			});
	}
})

const validateProduct = () => {
	const productNm = document.querySelector('#productNm').value
	const productImg = document.querySelector('#proImage').value
	if (!productNm || !productImg) return false
	return true
}

const showMessgae = (show, alertClass, msgTxt) => {
	message.hidden = show
	message.innerHTML = msgTxt ? msgTxt : ''
	message.className = ''
	alertClass ? message.classList.add('alert', alertClass) : ''
}