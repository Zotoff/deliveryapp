const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
}

// day 1
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInFormn = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('gloDelivery');

function authorized(){
  function logOut(){
    console.log('Logout');
    login = null;
    localStorage.removeItem('gloDelivery', )
    buttonOut.style.display = 'none';
    userName.style.display = 'none';
    buttonAuth.style.display = '';

    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  };

  buttonAuth.style.display = 'none';

  userName.textContent = login;
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', function(e){
    e.preventDefault();
    logOut();
  });
}

function notAuthorized(){
  console.log('Not Authorized');
  function logIn(e){
    e.preventDefault();
    if(loginInput.value == '') {
      alert('Пожалуйста, заполните поле Логин');
    } else {
      login = loginInput.value;
      localStorage.setItem('gloDelivery', login);

      toggleModalAuth();

      logInForm.reset();

      buttonAuth.removeEventListener('click', function(e){
        e.preventDefault();
        toggleModalAuth();
      });
      closeAuth.removeEventListener('click', function(e){
        e.preventDefault();
        toggleModalAuth();
      });
      logInFormn.removeEventListener('submit', logIn);

      checkAuth();
    }
  }

  buttonAuth.addEventListener('click', function(e){
    e.preventDefault();
    toggleModalAuth();
  });
  closeAuth.addEventListener('click', function(e){
    e.preventDefault();
    toggleModalAuth();
  });
  logInFormn.addEventListener('submit', logIn);
}

function checkAuth(){
  if(login) {
    authorized();
  } else {
    notAuthorized();
  }
}

checkAuth();