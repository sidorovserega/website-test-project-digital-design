// установка обработчика при прокрутке страницы для header and scroll
(function() {
  const header = document.querySelector('.main-header-menu');
  const scrollToStart = document.querySelector('.scroll-to-start');
  window.onscroll = () => {
    if (window.pageYOffset > 50) {
      header.classList.add('main-header-scroll');
      scrollToStart.classList.add('active');
    }
    if (window.pageYOffset <= 50) {
      header.classList.remove('main-header-scroll');
      scrollToStart.classList.remove('active');
    }
  };
}());


// установка плавного перехода по ссылкам с учетом размеров header
(function () {
  // функция плавной прокрутки 
  const smoothScroll = function (targetEl, duration) {
    const headerElHeight = document.querySelector('.main-header-menu').clientHeight;
    let target = document.querySelector(targetEl);
    let targetPosition = target.getBoundingClientRect().top - headerElHeight;
    let startPosition = window.pageYOffset;
    let startTime = null;
    
    const ease = function(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };
    
    const animation = function(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElApsed = currentTime - startTime;
      const run = ease(timeElApsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElApsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  }

  // устанавливаем обработчики события на элементы меню с классом js-scroll
  const scrollTo = function() {
    const mainNav = document.querySelector('.main-header-menu');
    const links = document.querySelectorAll('.js-scroll');
    links.forEach(each => {
      each.addEventListener('click', () => {
        mainNav.classList.remove('main-nav-active');
        const currentTarget = each.getAttribute('href');
        // при событии вызываем функцию прокрутки, передаем  id и время прокрутки
        smoothScroll(currentTarget, 1000);
      })
    })
  }
  scrollTo();
}());


// Установка обработчиков для отображении формы заказа
(function() {
  const cardButtons = document.querySelectorAll('.card-btn');
  const formContainer = document.querySelector('.form-container');
  const form = document.querySelector('.card-form');
  const formButtonAdd = document.querySelector('.form-btn-add');
  const formButtonClose = document.querySelector('.form-btn-close');
  const inputQuantity = document.querySelector('#quantity');
  const textareaReview = document.querySelector('#review');

  // обработчик нажатия на область вне формы
  formContainer.addEventListener('click', () => {
    formContainer.classList.remove('active');
  });
  
  // обработчик нажатия на форму
  form.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // установка обработчиков нажатия на кнопки в карточках
  cardButtons.forEach(cardBtn => {
    cardBtn.addEventListener('click', () => {
      formContainer.classList.add('active');
    })
  });

  // обработчик нажатия на кнопку "добавить" на форме
  formButtonAdd.addEventListener('click', (e) => {
    e.preventDefault();
   
    if (inputQuantity.value.length === 0 || Number(inputQuantity.value) < 1) {
      alert('Введите количество устройств либо нажмите на кнопку "Закрыть"');
      return;
    }

    const strEnd = Number(inputQuantity.value[inputQuantity.value.length - 1]);
    let str = 'устройств';
    if (strEnd === 1) {
      str = 'устройство';
    }
    if (strEnd === 2 || strEnd === 3 || strEnd === 4) {
      str = 'устройства';
    } 
    alert(`Заказ на ${inputQuantity.value} ${str} успешно создан!`);

    formButtonClose.click();
  });

  // обработчик нажатия на кнопку "закрыть" на форме
  formButtonClose.addEventListener('click', () => {
    formContainer.classList.remove('active');
  });
}());

// обработчик смены темы
(function() {
  const mainNav = document.querySelector('.main-header-menu');
  const buttonDark = document.querySelector('.theme-button-dark');
  const buttonLight = document.querySelector('.theme-button-light');
  const page = document.querySelector('.page');

  buttonDark.addEventListener('click', () => {
    buttonDark.classList.add('active');
    buttonLight.classList.remove('active');
    page.classList.add('dark');
  });

  buttonLight.addEventListener('click', () => {
    buttonDark.classList.remove('active');
    buttonLight.classList.add('active');
    page.classList.remove('dark');
  });

}());
  
//установка обработчика для открытия бургер-меню и его закрытия
(function() {
  const mainNav = document.querySelector('.main-header-menu');
  const burger = document.querySelector('.header-burger');
  const headerNavClose = document.querySelector('.header-nav-close');
  const scrollToStart = document.querySelector('.scroll-to-start');

  burger.addEventListener('click', () => {
    mainNav.classList.add('main-nav-active');
  });

  headerNavClose.addEventListener('click', () => {
    mainNav.classList.remove('main-nav-active');
  });
})();

//вывод даты в карточках в отформатированном виде
(function() {
  const timeElements = document.querySelectorAll('.card-time');
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const months = ['января', 'февраля', 'мерта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  const textFormat = (time) => {
    const data = new Date(time);
    const year = data.getFullYear(); 
    const month = months[data.getMonth()];
    const date = data.getDate();
    const day = days[data.getDay()];

    return day + ', ' + date + ' ' + month + ' ' + year + ' года';
  }

  timeElements.forEach(timeElement => {
    const time = timeElement.getAttribute('datetime');
    timeElement.innerHTML += textFormat(time);
  });
}())





