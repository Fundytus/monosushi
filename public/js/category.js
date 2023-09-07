window.addEventListener('load', () => {
	getCategories()
	welcomeUser()
})
const url = 'http://localhost:3001/api/v1/categories'

const catForm = document.querySelector('#catForm')
const catNm = document.querySelector('#catNm')
const message = document.querySelector('#message')
document.body.addEventListener('click', () => {
	showMessgae(true, '', '')
});

function AddCategory() {
	let categoryForm = document.querySelector('#catForm');
	categoryForm.style.display = 'block';
}

const getCategories = async () => {
	const url = 'http://localhost:3001/api/v1/categories'

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
			let categories = data
			categories.map((cat) => {
				tbody.appendChild(createCategoryTable(cat));
			});
		})
}

const createCategoryTable = (cat) => {
	const img = document.createElement('img');
	const catNmP = document.createElement('p')
	const catDesc = document.createElement('p')
	if (cat.catImg) {
		const imgPath = `../uploads/${JSON.stringify(cat.catImg).split('\\')[4].slice(0,-1)}`
		img.src = imgPath;
		img.classList.add('smCatImg')
	}
	catNmP.innerHTML = `${cat.name}`;
	catDesc.innerHTML = `${cat.catDesc}`
	let td1 = document.createElement('TD');
	let td2 = document.createElement('TD');
	td2.classList.add('px-3')
	td1.append(catNmP)
	td2.append(catDesc)
	const editCatTxt = document.querySelector('#editCatTxt')
	const editCatDesc = document.querySelector('#editCatDesc')
	const editBtn = document.createElement('button')
	editBtn.classList.add('btn', 'btn-success', 'm-2')
	editBtn.innerHTML = 'Edit'
	editBtn.setAttribute('data-bs-target', '#editModal')
	editBtn.setAttribute('data-bs-toggle', 'modal')
	editBtn.addEventListener('click', () => {
		const input = document.querySelector('#editCatImage')
		editCatTxt.value = catNmP.innerHTML
		editCatDesc.value = cat.catDesc ? cat.catDesc : ''

		const saveChangesBtn = document.createElement('button')
		saveChangesBtn.classList.add('btn', 'btn-success')
		saveChangesBtn.innerHTML = 'Save Changes'
		saveChangesBtn.setAttribute('data-bs-dismiss', 'modal')
		const saveChangesDiv = document.querySelector('#saveChangesDiv')
		saveChangesDiv.replaceChildren(saveChangesBtn)
		saveChangesBtn.addEventListener('click', () => {
			const editForm = document.querySelector('#editForm')
			const formData = new FormData(editForm)
			formData.append('catImg', (input.value != '') ? input.value : cat.catImg)
			editCategory(formData, cat._id)
			if (input.value)
				img.src = `../uploads/${JSON.stringify(input.value).split('\\')[4].slice(0,-1)}`
			catNmP.innerHTML = document.querySelector('#editCatTxt').value
			catDesc.innerHTML = document.querySelector('#editCatDesc').value

		})
	})
	let tr = document.createElement('TR');

	//create delete button
	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('btn', 'btn-danger')
	deleteBtn.innerHTML = 'Delete'
	deleteBtn.addEventListener('click', () => {
		if (confirm('Are you sure to delete this Category?')) {
			deleteCategory(cat._id)
			tr.remove()
		}
	})

	tr.appendChild(td1);
	tr.appendChild(td2);
	let td3 = document.createElement('TD');
	let td4 = document.createElement('TD');
	td3.appendChild(img);
	tr.appendChild(td3);
	td4.classList.add('ps-3')
	td4.appendChild(editBtn);
	tr.appendChild(td4)
	td4.appendChild(deleteBtn);
	tr.appendChild(td4)
	return tr
}

const deleteCategory = async (catId) => {
	await fetch(`${url}/${catId}`, {
		method: "Delete",
		headers: {
			"authorization": localStorage.getItem('token')
		}
	})
	showMessgae(false, 'alert-success', 'Category deleted Successfuly!')
}

const editCategory = async (formData, catId) => {
	await fetch(`${url}/${catId}`, {
			method: "PATCH",
			body: formData,
			headers: {
				"authorization": localStorage.getItem('token')
			}
		})
		.then(response => response.json())
		.then(json => {
			console.log(json)
			showMessgae(false, json.category ? 'alert-success' : 'alert-danger', json.message)
		});

}

catForm.addEventListener('submit', async e => {
	e.preventDefault()
	if (validateCategory) {
		const formData = new FormData(catForm)
		const input = document.querySelector('#catImage')
		formData.append('catImg', input ?.value)
		await fetch(url, {
				method: "POST",
				body: formData,
				headers: {
					"authorization": localStorage.getItem('token')
				}
			}).then(response => response.json())
			.then(json => {
				console.log(json)
				//if categorySaved
				if (!json.category) {
					showMessgae(false, 'alert-danger', json.message)
				} else {
					for (const element of catForm.elements) {
						element.value = ''
					}
					showMessgae(false, 'alert-success', json.message)
					document.querySelector('#tbody').appendChild(createCategoryTable(json.category))
					let categoryForm = document.querySelector('#catForm');
					categoryForm.style.display = 'none';

				}
			});
	}
})

const validateCategory = () => {
	const catNm = document.querySelector('#catNm').value
	const catImg = document.querySelector('#catImage').value
	if (!catNm || !catImg) return false
	return true
}


const showMessgae = (show, alertClass, msgTxt) => {
	message.hidden = show
	message.innerHTML = msgTxt ? msgTxt : ''
	message.className = ''
	alertClass ? message.classList.add('alert', alertClass) : ''
}