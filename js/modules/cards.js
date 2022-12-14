import {getResourse} from '../services/services'
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

export default cards;