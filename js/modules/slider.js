function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    //Slider

    // 1.получить все элементы с какими работаем
    // 2.получить индекс для работы
    // 3.функция показа слайдов - принимает индекс и показывает, условие конца
    // 4.навесить обработчики событий

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    //нужен для контроля отступа
    let offset = 0;


    //обрабатываем отображение слайдов



    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
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
    slides.forEach(slide => {
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

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
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
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }


    //номер текущего слайда 

    function currentSlide() {

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    next.addEventListener('click', () => {
        //вычисляем последний слайд по формуле
        if (offset == (deletePX(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += deletePX(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentSlide();
        dotActive();

    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deletePX(width) * (slides.length - 1);
        } else {
            offset -= deletePX(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
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
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deletePX(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;


            currentSlide();
            dotActive();


        });
    });

    function deletePX(str) {
        return +str.replace(/px/g, '');
    }
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


}

export default slider;