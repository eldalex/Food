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

export default slider;