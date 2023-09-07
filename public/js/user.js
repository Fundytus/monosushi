const addUser = async () => {
	const url = 'http://localhost:3001/api/v1/users/register'
	let fNm = document.querySelector('#usrFNm').value
	let lNm = document.querySelector('#usrLNm').value
	let address = document.querySelector('#address').value
	let code = document.querySelector('#code').value
	let phoneNm = document.querySelector('#phone').value
	let email = document.querySelector('#email').value
	let password = document.querySelector('#password').value
	let isAdmin;
	if (email === "admin@gmail.com") {
		isAdmin = true
	} else {
		isAdmin = false
	}

	await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				name: {
					fName: fNm,
					lName: lNm
				},
				password: password,
				isAdmin: isAdmin,
				address: address,
				phoneNm: {
					code: Number(code),
					phoneNm: Number(phoneNm)
				},
				email: email
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		.then(response => response.json())
		.then(json => {
			if (json.message) {
				const errMsg = document.querySelector('.alert-danger')
				const msg = document.querySelector('#errorMsg');
				errMsg.classList.remove('fade');
				errMsg.classList.add('show');
				msg.innerHTML = json.message
			} else {
				const successMsg = document.querySelector('.alert-success');
				const msg = document.querySelector('.msg');
				successMsg.classList.remove('fade');
				successMsg.classList.add('show');
				msg.textContent = 'User created successfully';
				fNm = '';
				lNm = '';
				address = '';
				phoneNm = '';
				email = '';
				password = '';
			}
		})

}

const login = async () => {
	const email = document.querySelector("#email").value
	const password = document.querySelector('#password').value
	const url = "http://localhost:3001/api/v1/users/login"
	await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				"email": email,
				"password": password
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		.then(response => response.json())
		.then(json => {
			const errMsg = document.querySelector('.alert-danger')
			const msg = document.querySelector('#errorMsg');
			errMsg.classList.remove('fade');
			errMsg.classList.add('show');
			msg.innerHTML = json.message ? json.message : ''
			if (json.token) {
				localStorage.setItem('token', json.token)
				localStorage.setItem('email', json.user.email)
				localStorage.setItem('isAdmin', json.user.isAdmin)
				window.location.href = './index.html'
			}
		})
}