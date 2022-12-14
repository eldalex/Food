/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    //Калькулятор каллорий

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female'
        localStorage.setItem('sex', 'female')
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.375
        localStorage.setItem('ratio', 1.375)
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass)
            }
        })
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active')
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    };
    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                })
                e.target.classList.add(activeClass)

                calcTotal();
            });
        })

    }

    getStaticInformation('#gender div', 'calculating__choose-item_active')
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active')

    function getDinamycInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red'
            } else {
                input.style.border = 'none';
            }
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;

                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDinamycInformation('#height')
    getDinamycInformation('#weight')
    getDinamycInformation('#age')

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {
    // 79 шаблонизация элементов меню на сайте.
    // Использование классов
    // моя реализация
    /* class MenuItem {
         constructor(imgSrc, alt, itemSubtitle, itemDescr, price) {
             this.imgSrc = imgSrc;
             this.alt = alt;
             this.itemSubtitle = itemSubtitle;
             this.itemDescr = itemDescr;
             this.price = price;
         }

         createMenuItem() {
             const itemMenuDiv = document.createElement('div');
             itemMenuDiv.classList.add('menu__item');
             itemMenuDiv.innerHTML = "" +
                 `<img src=\"img/tabs/${this.imgSrc}\" alt=\"${this.alt}\">\n` +
                 `<h3 class=\"menu__item-subtitle\">${this.itemSubtitle}</h3>\n` +
                 `<div class=\"menu__item-descr\">${this.itemDescr}\n` +
                 "</div>\n" +
                 "<div class=\"menu__item-divider\"></div>\n" +
                 "<div class=\"menu__item-price\">\n" +
                 "<div class=\"menu__item-cost\">Цена:</div>\n" +
                 `<div class=\"menu__item-total\"><span>${this.price}</span> грн/день</div>\n` +
                 "</div>";
             return itemMenuDiv
         }
     }
     menuList=[new MenuItem('vegy.jpg','vegy','Меню "Фитнес"','Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!','229'),
     new MenuItem('elite.jpg','elite','Меню “Премиум”','В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!','550'),
     new MenuItem('post.jpg','post','Меню "Постное"','Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.','430')]

     const menu=document.querySelector('.menu__field'),
         menuContent=menu.querySelector('.container'),
         menuItems=menuContent.querySelectorAll('.menu__item');
     menuItems.forEach(item =>{
         item.remove()
     })
     for (item of menuList){
         menuContent.append(item.createMenuItem())
     }
 */

    //реализация урока
    const menu = document.querySelector('.menu__field'),
        menuContent = menu.querySelector('.container'),
        menuItems = menuContent.querySelectorAll('.menu__item');

    class MenuCard {
        constructor(scr, alt, title, descr, price, parentSelector, ...classes) {
            this.scr = scr;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector)
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            // если в rest оператор не были переданы парметры
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className))
            }

            element.innerHTML = `
                    <img src="${this.scr}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }



    menuItems.forEach(item => {
        item.remove()
    })

    //создаем карточки меню через fetch
    // getResourse('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
    //         })
    //     });

    //создаем карточки меню через axios
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
            });
        })

    //// Одноразовый вариант, при стартре функция выполнится один раз и боьлше не будет повторяться
    // getResourse('http://localhost:3000/menu')
    //     .then(data => createCard(data))

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div')
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //                             <img src="${img}" alt="${altimg}">
    //                             <h3 class="menu__item-subtitle">${title}</h3>
    //                             <div class="menu__item-descr">${descr}</div>
    //                             <div class="menu__item-divider"></div>
    //                             <div class="menu__item-price">
    //                             <div class="menu__item-cost">Цена:</div>
    //                             <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //                             </div>
    //
    //         `;
    //         document.querySelector('.menu .container').append(element)
    //     })
    // }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function forms(formSelector,modalTimerId) {
    //FORMS
    const froms = document.querySelectorAll(formSelector);

    const message = {
        loading: '/img/form/spinner.svg',
        success: 'Спасибо! Мы свяжемся с вами как можно быстрее!',
        failure: 'Что то пошло не так...'
    };

    froms.forEach(item => {
        bindPostData(item);
    })



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.textContent = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage)

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)(' http://localhost:3000/requests', json)
                .then(data => {
                    showThanksModal(message.success)
                    statusMessage.remove();
                }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal',modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');             // вариант без класса show у модального окна
    modal.classList.remove('hide');          // вариант без класса show у модального окна
    // modal.classList.toggle('show');         //toggle (переключаем) класс show отвечающий за отображение нашей модальной формы
    document.body.style.overflow = 'hidden';    // добавление стиля, который запрещает скролить страницу (кроме модального окна)
    console.log(modalTimerId)
    if (modalTimerId) {
        clearInterval(modalTimerId) // сброс таймера открытия модального окна, если окно хотя бы раз было открыто
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');         // вариант без класса show у модального окна
    modal.classList.remove('show');      // вариант без класса show у модального окна
    // modal.classList.toggle('show');     //toggle (переключаем) класс show отвечающий за отображение нашей модальной формы
    document.body.style.overflow = '';      // возвращаем скролл на место.

}

function modal(triggerSelector, modalSelector,modalTimerId) {

    // модальное окно 72, 73

    /* // Моя реализация.
        const dataModal=document.querySelectorAll('[data-modal]'),
            dataModalClose=document.querySelector('[data-close]'),
            modalWindow = document.querySelector('.modal')
        console.log(dataModal)
        console.log(dataModalClose)
        dataModalClose.addEventListener('click',hideModal)
        dataModal.forEach(item =>{
            item.addEventListener('click', ()=>{
                showModal();
            })
        })

        function showModal(){
            modalWindow.style.display="block"
        }

        function hideModal(){
            modalWindow.style.display="none"
        }
    */
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    // modalCloseBtn = document.querySelector('[data-close]');


    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector,modalTimerId));
    });


    // modalCloseBtn.addEventListener('click', closeModal);

    //закрытие модального окна при клике вне самого окна.
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector)
        }
    });
    // отслеживание кнопки esc, для закрытия окна
    // так можно отследить любую клавишу
    // тут можно посмотреть инфу о кодах https://www.toptal.com/developers/keycode
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });



    // функция для обработчика события scroll глобального окна.
    function showModalByScroll() {
        // если верхняя позиция Y окна (то что уже проскролили ) + всё доступное в данный момент окно >= всей высоте документа
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector,modalTimerId); // открываем окно
            window.removeEventListener('scroll', showModalByScroll) // удаляем событие, чтобы оно не повторялось постоянно по достижении конца страницы
        }

    }

    // навешиваем событие на scroll окна.
    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide,nextArrow,prevArrow,totalCounter,currentCounter,wrapper,field}) {
    // Слайдер, моя реализация
    // const slider = document.querySelector('.offer__slider'),
    //     sliderCounter = slider.querySelector('.offer__slider-counter'),
    //     nextSlide = sliderCounter.querySelector('.offer__slider-next'),
    //     prevSlide = sliderCounter.querySelector('.offer__slider-prev'),
    //     sliderWrapper = slider.querySelector('.offer__slider-wrapper');
    // let slides = sliderWrapper.querySelectorAll('.offer__slide')
    //
    // slides.forEach(item => {
    //     item.remove();
    // })
    //
    // axios.get('http://localhost:3000/slider')
    //     .then(data => {
    //         const totalSlides = document.getElementById("total")
    //         const currentSlide = document.getElementById("current")
    //         currentSlide.textContent = '01'
    //         if (data.data.length > 9) {
    //             totalSlides.textContent = data.data.length
    //         } else
    //             totalSlides.textContent = `0${data.data.length}`
    //         data.data.forEach(item => {
    //             elementDiv = document.createElement('div');
    //             elementDiv.classList.add('offer__slide')
    //             elementImg = document.createElement('img');
    //             elementImg.setAttribute('src', item.img);
    //             elementImg.setAttribute('alt', item.alt);
    //             elementDiv.append(elementImg);
    //             sliderWrapper.append(elementDiv)
    //             hideAllSlides()
    //             showSlide(1)
    //         })
    //     });
    //
    // function hideAllSlides() {
    //     slides = sliderWrapper.querySelectorAll('.offer__slide')
    //     slides.forEach(item => {
    //         item.classList.add('hide')
    //     })
    // }
    //
    // function showSlide(numberOfSlide) {
    //     hideAllSlides()
    //     slides = sliderWrapper.querySelectorAll('.offer__slide')
    //     slides[numberOfSlide - 1].classList.add('show')
    //     slides[numberOfSlide - 1].classList.remove('hide')
    // }
    //
    // nextSlide.addEventListener('click', () => {
    //     let totalSlides = parseInt(document.getElementById("total").textContent)
    //     let currentSlide = parseInt(document.getElementById("current").textContent)
    //     currentSlide<totalSlides ? currentSlide += 1: currentSlide=1
    //     currentSlide<9 ? document.getElementById('current').textContent=`0${currentSlide}`:document.getElementById('current').textContent=currentSlide
    //     showSlide(currentSlide)
    // })
    //
    // prevSlide.addEventListener('click', () => {
    //     let totalSlides = parseInt(document.getElementById("total").textContent)
    //     let currentSlide = parseInt(document.getElementById("current").textContent)
    //     currentSlide>1 ? currentSlide -= 1: currentSlide=totalSlides
    //     currentSlide<9 ? document.getElementById('current').textContent=`0${currentSlide}`:document.getElementById('current').textContent=currentSlide
    //     showSlide(currentSlide)
    // })

    //slider реализация урока №1
    // const slides = document.querySelectorAll('.offer__slide'),
    //         prev = document.querySelector('.offer__slider-prev'),
    //     next = document.querySelector('.offer__slider-next');
    //     total = document.querySelector('#total') //////Выбор по ID
    //     current = document.querySelector('#current') //////Выбор по ID
    // let slideIndex = 1;
    //
    // showSlides(slideIndex)
    //
    // if (slides.length<10){
    //     total.textContent=`0${slides.length}`
    // }else {
    //     total.textContent=slides.length
    // }
    //
    // function showSlides(n){
    //     if (n>slides.length){
    //         slideIndex=1;
    //     }
    //     if (n<1){
    //         slideIndex=slides.length;
    //     }
    //     slides.forEach(item=>item.style.display='none');
    //     slides[slideIndex-1].style.display='block';
    //
    //     if (slides.length<10){
    //         current.textContent=`0${slideIndex}`
    //     }else {
    //         current.textContent=slideIndex
    //     }
    // }
    // function plusSlides(n){
    //     showSlides(slideIndex+=n);
    // }
    // prev.addEventListener('click',()=>{
    //     plusSlides(-1);
    // })
    // next.addEventListener('click',()=>{
    //     plusSlides(1);
    // })

    //slider реализация урока №2, усложнённый
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter), //////Выбор по ID
        current = document.querySelector(currentCounter),//////Выбор по ID
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`
        current.textContent = `0${slideIndex}`
    } else {
        total.textContent = slides.length
        current.textContent = slideIndex
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden'


    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    // ▼▼▼▼▼▼▼Навигация для слайдов▼▼▼▼▼▼▼
    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');

    slider.append(indicators);
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot')
        if (i == 0) {
            dot.style.opacity = 1
        }
        indicators.append(dot)
        dots.push(dot);
    }
    // ▲▲▲▲▲▲Навигация для слайдов▲▲▲▲▲▲
    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width)
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++
        }

        setCurrentSlide(slideIndex)

        // ▼▼▼▼▼▼Навигация для слайдов▼▼▼▼▼▼
        activeNavigationDot(slideIndex)
        // ▲▲▲▲▲▲Навигация для слайдов▲▲▲▲▲▲
    })

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '')
    }

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width)
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex;
        }
        // ▼▼▼▼▼▼Навигация для слайдов▼▼▼▼▼▼
        activeNavigationDot(slideIndex)
        // ▲▲▲▲▲▲Навигация для слайдов▲▲▲▲▲▲
    })

    // ▼▼▼▼▼▼Навигация для слайдов▼▼▼▼▼▼
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to')

            slideIndex = slideTo
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            setCurrentSlide(slideIndex)
            activeNavigationDot(slideIndex)


        });
    });

    // ▲▲▲▲▲▲Навигация для слайдов▲▲▲▲▲▲
    function setCurrentSlide(slideIndex) {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex;
        }
    }

    function activeNavigationDot(slideIndex) {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector,tabsParrentSelector,activeClass) {
    //tabs
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParrentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }


    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    // Timer

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());// получаем количество мс до которого надо досчитать
        let days, hours, minutes, seconds;
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24))
            hours = Math.floor((t / (1000 * 60 * 60) % 24))
            minutes = Math.floor((t / 1000 / 60) % 60)
            seconds = Math.floor((t / 1000) % 60);

        }
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResourse": () => (/* binding */ getResourse),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

const getResourse = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }
    return await res.json();

};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");









window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('.modal',modalTimerId), 600000000);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer','2022-12-31');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form',modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container:'.offer__slider',
        slide:'.offer__slide',
        nextArrow:'.offer__slider-next',
        prevArrow:'.offer__slider-prev',
        totalCounter:'#total',
        currentCounter:'#current',
        wrapper:'.offer__slider-wrapper',
        field:'.offer__slider-inner'
    });
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map