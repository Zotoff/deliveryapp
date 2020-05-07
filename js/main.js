"use strict";

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

// day 1
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInFormn = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

// day 2
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('gloDelivery');

const valid = function(str) {
  const namereg = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
  if(!namereg.test(str)){
    if(str.length < 20) alert('Имя слишком длинное');
  } else {
    return true;
  }
}

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
}

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
    } else if(valid(loginInput.value)) {
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
    } else {
      loginInput.value = '';
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



//day 2
function createCardRestaurant(){
  const card = `
  <a class="card card-restaurant">
						<img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">Тануки</h3>
								<span class="card-tag tag">60 мин</span>
							</div>
							<div class="card-info">
								<div class="rating">
									4.5
								</div>
								<div class="price">От 1 200 ₽</div>
								<div class="category">Суши, роллы</div>
							</div>
						</div>
	</a>
  `;

  cardsRestaurants.insertAdjacentHTML('afterbegin', card);
}

createCardRestaurant();
createCardRestaurant();

function createCardOfGood(){
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
    <img src="img/pizza-plus/pizza-oleole.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">Пицца Оле-Оле</h3>
      </div>
      <div class="card-info">
        <div class="ingredients">Соус томатный, сыр «Моцарелла», черри, маслины, зелень, майонез
        </div>
      </div>
        <div class="card-buttons">
        <button class="button button-primary button-add-cart">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">440 ₽</strong>
      </div>
    </div>
  `);
  cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event){
  const target= event.target;
  const restaurant = target.closest('.card-restaurant'); // ищем родительский селектор

  if(restaurant) {
    
    if(login) {
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');
  
      cardsMenu.textContent = ''; // очищаем меню
  
      createCardOfGood();
      createCardOfGood();
      createCardOfGood();
    } else {
      toggleModalAuth();
    }
    
  }
}

checkAuth();

cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', function(e){
  e.preventDefault();
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
});

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

new Swiper('.swiper-container', {
  loop: true,
  autoplay: true
})