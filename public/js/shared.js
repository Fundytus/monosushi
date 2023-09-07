const welcomeUser = (page = '') =>{
    const logIn = document.querySelector('.userBlock');
    const logInBtn = document.querySelector('#logIn');
    const logOut = document.querySelector('.logOut')
    const logOutBtn = document.querySelector('#logOut')

    if(localStorage.getItem('token')){
        let signUp = document.querySelectorAll('.reg')
        signUp.forEach(el => el.hidden = "none");        
        logIn.classList.add('visually-hidden')
        logOut.classList.remove('visually-hidden')

        if(page == 'index')
            window.location.href = './home.html'
        logOutBtn.addEventListener('click', () => {
            clearCookies('categoryId')
            clearCookies('cartArr')
            window.location.href = './index.html'
            logIn.classList.remove('visually-hidden')
            logOut.classList.add('visually-hidden')    
            localStorage.clear()
        })
    }
    else
    {
        logInBtn.addEventListener('click', () => {
            window.location.href = 'login.html'
            // document.querySelector('signUp')?.hidden = false
        })
    }
    // edit to better way later
    if (localStorage.getItem('isAdmin') == 'true') {
        const showSettings = document.querySelector("#showSettings")
        showSettings.hidden = false
    }
}
const clearCookies = name => {
    document.cookie = name + '=; Max-Age=-99999999;'
  }

const getCookie= cname => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }



