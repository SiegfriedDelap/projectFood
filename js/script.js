window.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            // item.style.display = 'none'; //скрываем табы inline

            item.classList.add('hide'); //добавили класс
            item.classList.remove('show', 'fade'); //убрали ненужный

        });

        tabs.forEach(item => {

            item.classList.remove('tabheader__item_active'); //убираем класс активности у всех табовы

        });
    }

    function showTabContent(i = 0) { //передаем какой элемент хотим показать, i = 0 дефолт значение 
        // tabsContent[i].style.display = 'block'; //inline вариант смены стиля
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }



    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {

        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            //при клике на список мы должны определять его номер и вызвать функцию шоу
            tabs.forEach((item, i) => { //callback func мы перебираем все табы и их номера, если клик мышки по табу совпал с табом из фор ича, то мы вызываем
                //две функции написаные ранее, а в шоу кладем номер таба для показа

                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }

            });
        }

    });

    //Timer

    const deadLine = '2021-01-10';

    function getTimeRemaning(endtime) { //получаем время

        const t = Date.parse(endtime) - Date.parse(new Date()), //парсим в Дату строку, получаем разницу в мс 
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // 1000мс умножаем на 60 получаем колво мс в минуте, потом еще получаем в часе, потом сколько в сутках мс, хвост дропаем
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), //cперва получаем часы в мс, а потом процентом изымаем дни 
            minutes = Math.floor((t / (1000 * 60) % 60)), //количество минут в мс
            seconds = Math.floor((t / (1000) % 60)); //количество секунд в мс

        return { //ретюрнаем объект времени

            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function getZero(num) { // добавляем 0 к числам меньше 10
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock(); //для уборки мигания в верстке

        function updateClock() {
            const t = getTimeRemaning(endtime);

            days.innerHTML = getZero(t.days);

            hours.innerHTML = getZero(t.hours);

            minutes.innerHTML = getZero(t.minutes);

            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {

                clearInterval(timeInterval);
                days.innerHTML = "X";
                hours.innerHTML = "X"; //по умолчанию при отрицательном
                minutes.innerHTML = "X";
                seconds.innerHTML = "X";
            }
        }

    }


    setClock('.timer', deadLine);


    //Модальное окно


    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    //открытие модального окна

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; //прокрутка не работает
        clearInterval(modalTimerId); //если пользователь сам открыл модалку, то мы больше его не задрачиваем
    }

    modalTrigger.forEach(btn => {

        btn.addEventListener('click', openModal);

    });

    function closeModal() {

        modal.classList.add('hide');
        modal.classList.remove('show');
        //modal.classList.toggle('show');
        document.body.style.overflow = '';

    }


    modalCloseBtn.addEventListener('click', closeModal);


    //клик вне области модального окна закрывает его
    modal.addEventListener('click', (e) => {

        if (e.target === modal) {

            closeModal();

        }


    });

    //Esc закрывает модальное окно
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    //открытие модального онка через Ное время

    const modalTimerId = setTimeout(openModal, 5000000);

    //долистали до конца вызвали модалку

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //Создание карточек на сайте при помощи классов

    class MenuCard {

        constructor(src, alt, title, descr, price, parentSelector /* куда будем помещать*/ , ...classes /*rest оператор если нужно еще добавить классов в будущем */) {
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

            if(this.classes.length === 0 /*не один класс не был передан*/){
                this.element = 'menu__item';
                element.classList.add(this.element); /*Добавляем класс по умолчанию*/
            }else {
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

    //использование объекта на месте, только один раз, создаться и удалиться

    //тут ломается верстка чутка, но то потом исправим


    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',

    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, свежие морепродукты, фрукты, овощи - ресторанное меню без похода в ресторан!',
        19,
        '.menu .container',

    ).render();

    
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        '.menu .container',
        
    ).render();

});