import {getResource} from '../services/services';

function cards() {

    class MenuCard {

        constructor(src, alt, title, descr, price, parentSelector /* куда будем помещать*/ , ...classes /*rest оператор если нужно еще добавить классов в будущем */ ) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector); //помещаем сюда родителя куда будем пихать карточку
            this.dollarRate = 28; //курс доллара
            this.convertToUAN(); //Динамическая конвертация валюты
        }

        convertToUAN() {
            this.price = this.price * this.dollarRate; //метод конвертации валюты
        }

        render() { //рендер страницы

            // 1.Создать элемент

            // 3.Дополнить данными, используя интерполяцию и класс

            const element = document.createElement('div');

            if (this.classes.length === 0 /*не один класс не был передан*/ ) {
                this.element = 'menu__item';
                element.classList.add(this.element); /*Добавляем класс по умолчанию*/
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            //4.Обработать переменную рест с классами по правилам массива, значение классов добавить к выводимому элементу
            //5. Добавить класс .menu__item в дефолтное значение через иф в рендере
            element.innerHTML = ` 
               
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;

            // 2.Поместить верстку на страницу

            this.parent.append(element);

        }
    }


    //генерация карт с шаблонизацией

    getResource('http://localhost:3000/menu')
        .then(data => {
    data.forEach(({img, altimg, title, descr, price}) => { //деструктуризация объекта по его  частям
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
        });

    //AXIOS BIBLE 

    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price
    //         }) => { //деструктуризация объекта по его  частям
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    //Генерация без шаблонизации карт товаров с базы данных

    // getResource('http://localhost:3000/menu')
    // .then(data =>createCard(data));

    // function createCard(data){
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector('.menu .container').append(element);
    //     });

    // }
}

export default cards;