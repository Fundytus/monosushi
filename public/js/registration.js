window.addEventListener('load',()=>{
    welcomeUser()
    getUser()
})
const url = 'http://localhost:3001/api/v1/user'

const getUser = async () => {
    await fetch(url, {
		method: 'GET',
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			"authorization":localStorage.getItem('token')
		}
	})
	.then(response => response.json())
	.then((user) => {
		console.log(user)
		const fName = document.querySelector('#fName')
		fName.innerHTML = user.name.fName
		const lName = document.querySelector('#lName')
		lName.innerHTML = user.name.lName
		const email = document.querySelector('#email')
		email.innerHTML = user.email
		const city = document.querySelector('#city')
		city.innerHTML = user.address.city
		const zip = document.querySelector('#zip')
		zip.innerHTML = user.address.zip
		const address = document.querySelector('#address')
		address.innerHTML = user.address.address
		const code = document.querySelector('#code')

		code.innerHTML = user.phoneNm.code
		const phone = document.querySelector('#phone')
		phone.innerHTML = user.phoneNm.phoneNm

    })

}

const userData = document.querySelectorAll('.changeData')

const updateUser =() =>{
	userData.forEach(div => {
		const text = document.createElement('input')
		text.type = 'text'
		text.classList.add('form-control') 
		text.value = div.innerHTML
		text.setAttribute('id',`${div.getAttribute('id')}U`)// U means update to distingush between div and text
		div.innerHTML = '' 
		div.appendChild(text)
		updateBtn.classList.add('visually-hidden')
		saveBtn.classList.remove('visually-hidden')
	});	
}
const updateBtn = document.querySelector('#updateBtn')
const saveBtn = document.querySelector('#saveBtn')


const message = document.querySelector('#message')

const saveChanges = async () =>{
	let user = {}
	user.name={} 
	user.address ={}
	user.phoneNm = {}
	document.querySelector('#fName').innerHTML = 
	user.name.fName = document.querySelector('#fNameU').value
	document.querySelector('#lName').innerHTML =
	user.name.lName = document.querySelector('#lNameU').value
	document.querySelector('#email').innerHTML = 
	user.email = document.querySelector('#emailU').value
	document.querySelector('#city').innerHTML = 
	user.address.city =  document.querySelector('#cityU').value
	document.querySelector('#address').innerHTML = 
	user.address.address =  document.querySelector('#addressU').value
	document.querySelector('#zip').innerHTML = 
	user.address.zip =  document.querySelector('#zipU').value
	document.querySelector('#code').innerHTML = 
	user.phoneNm.code =  document.querySelector('#codeU').value
	document.querySelector('#phone').innerHTML = 
	user.phoneNm.phoneNm =  document.querySelector('#phoneU').value
	if(!user.name.fName ||!user.name.lName )
		return
	await fetch(`${url}`, {
		method: "PATCH",
		body: JSON.stringify(user),
		headers: {
			"authorization":localStorage.getItem('token'),
			"Content-type": "application/json; charset=UTF-8",

		}})
		.then(response => response.json())
		.then((data) => {
			if(data.user){
				 message.innerHTML = data.message
				 message.hidden = false 
			}			
			saveBtn.classList.add('visually-hidden')
			updateBtn.classList.remove('visually-hidden')
		})
}