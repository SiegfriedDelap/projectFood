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
        modal = document.querySelector('.modal');

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


  


    //клик вне области модального окна закрывает его
    modal.addEventListener('click', (e) => {

        if (e.target === modal || e.target.getAttribute('data-close')=='') {

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

    //добытие данных с бд

    const getResource = async (url) => {
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    //генерация карт с шаблонизацией

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
            // data.forEach(({img, altimg, title, descr, price}) => { //деструктуризация объекта по его  частям
            //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            // });
    //     });

     axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => { //деструктуризация объекта по его  частям
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

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


    //Отправка данных на вебсервер

    const forms = document.querySelectorAll('form');

    //Ошибки сообщения, нужно поместить на страницу
    const message = {
        loading: 'img/form/spinner.svg',
        succes: 'Спасибо! Mы скоро с вами свяжемся!',
        failure:'Что-то пошло не так...'
    };

    forms.forEach(item =>{
        bindPostData(item);
    }); //на каждые данные отправляем 

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

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText=`
            display: block;
            margin: 0 auto;
            `;
            

            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                 console.log(data);
                 showThanksModal(message.succes);
                 statusMessage.remove();
           }).catch(()=>{
                 showThanksModal(message.failure);
           }).finally(()=>{
                 form.reset();
           });
        });
    }

    //Показывание окна благорадрности на месте модалки

    function showThanksModal(message) {
        
        //cкрыть блок

        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();


        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class ="modal__content">
            <div class="modal__close" data-close>x</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
        
        //цепляем созданую модалку

        document.querySelector('.modal').append(thanksModal);

        //убираем созданую модалку через 4 секунды

        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);

    }

    //Slider

    // 1.получить все элементы с какими работаем
    // 2.получить индекс для работы
    // 3.функция показа слайдов - принимает индекс и показывает, условие конца
    // 4.навесить обработчики событий

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    //нужен для контроля отступа
    let offset = 0;


    //обрабатываем отображение слайдов

    

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }else{
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

  
    
    // запихиваем все слайды в одно окно
    slidesField.style.width = 100 * slides.length + '%';
    //Все слайды в одну линию
    slidesField.style.display = 'flex';
    //плавный переход
    slidesField.style.transition = '0.5s all';
    //Ограничиваем показ жлементов внутри врапера
    slidesWrapper.style.overflow = 'hidden';

    //устанавливаем одинаковую ширину слайдам
    slides.forEach(slide=>{
        slide.style.width = width;
    });

    //задаем релятивную позицию слайдера
    slider.style.position = 'relative';


    //создаем список навигации по карусели
    const indicators = document.createElement('ol'),
    //динамический актив    
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    //создаем точки на слайдах, атрибутом даем назначение слайдам

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        //класс активности на первый слайд
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    //Активная точка

    function dotActive() {
        dots.forEach(dot => dot.style.opacity ='.5');
        dots[slideIndex-1].style.opacity = 1;
    }


    //номер текущего слайда 

    function currentSlide(){
        
        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    next.addEventListener('click', ()=>{
        //вычисляем последний слайд по формуле
        if(offset == +width.slice(0, width.length-2) * (slides.length - 1)){
            offset = 0;
        } else {
            offset += +width.slice(0, width.length-2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length){
            slideIndex =1;
        } else {
            slideIndex++;
        }

        currentSlide();
        dotActive();

    });

    prev.addEventListener('click', ()=>{
        if(offset == 0){
            offset = +width.slice(0,width.length-2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0,width.length-2);
        }
        
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }


        //Точки на слайдерах горят в соответствии со слайдами

        currentSlide();
        dotActive();


    });

    //обработчик кликов по точкам

    dots.forEach(dot => {
        dot.addEventListener('click', (e)=>{
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo-1);

            slidesField.style.transform = `translateX(-${offset}px)`;


            currentSlide();
            dotActive();


        });
    });

    //простая версия без активности и карусели

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // }else{
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     //если н больше количества слайдов, ушли в правую границу, то идем в начало
    //     if (n> slides.length){
    //         slideIndex = 1;
    //     }
    //     //если н меньше чем еденица, то идем просто в конец слайдов
    //     if (n<1){
    //         slideIndex = slides.length;
    //     }

    //     //скрываем все слайды
    //     slides.forEach(item => item.style.display = 'none');

    //     //показываем текущий слайд начиная с 0 элемента массива данных со слайдами
    //     slides[slideIndex - 1].style.display = 'block';

        // if (slides.length < 10) {
        //     current.textContent = `0${slideIndex}`;
        // }else{
        //     current.textContent = slideIndex;
        // }
        
    // }

    
    // prev.addEventListener('click', ()=> {
    //     plusSlide(-1);
    // });function plusSlide(n){
    //     showSlides(slideIndex += n);
    // }


    // next.addEventListener('click', ()=> {
    //     plusSlide(1);
    // });


});