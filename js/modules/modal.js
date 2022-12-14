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

export default modal;
export {closeModal};
export {openModal};