window.addEventListener('DOMContentLoaded',()=>{
    
    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
         tabsContent = document.querySelectorAll('.tabcontent'),
         tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach(item => {
            // item.style.display = 'none'; //скрываем табы inline
            
            item.classList.add('hide'); //добавили класс
            item.classList.remove('show', 'fade'); //убрали ненужный

        });

        tabs.forEach(item =>{

            item.classList.remove('tabheader__item_active'); //убираем класс активности у всех табовы

        });
    }

    function showTabContent (i = 0) { //передаем какой элемент хотим показать, i = 0 дефолт значение 
       // tabsContent[i].style.display = 'block'; //inline вариант смены стиля
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }



    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e)=>{

        const target = e.target;

        if(target && target.classList.contains('tabheader__item')){
            //при клике на список мы должны определять его номер и вызвать функцию шоу
            tabs.forEach((item, i )=>{ //callback func мы перебираем все табы и их номера, если клик мышки по табу совпал с табом из фор ича, то мы вызываем
                //две функции написаные ранее, а в шоу кладем номер таба для показа

                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }

            });
        }

    });

    //Timer

    const deadLine = '2021-01-7';

    function getTimeRemaning (endtime) { //получаем время

        const t = Date.parse(endtime) - Date.parse(new Date()), //парсим в Дату строку, получаем разницу в мс 
            days = Math.floor(t/(1000*60*60*24)), // 1000мс умножаем на 60 получаем колво мс в минуте, потом еще получаем в часе, потом сколько в сутках мс, хвост дропаем
            hours = Math.floor((t/(1000*60*60)%24)), //cперва получаем часы в мс, а потом процентом изымаем дни 
            minutes = Math.floor((t/(1000*60)%60)), //количество минут в мс
            seconds = Math.floor((t/(1000)%60)); //количество секунд в мс
    
        return { //ретюрнаем объект времени

            'total': t,
            'days':days,
            'hours':hours,
            'minutes':minutes,
            'seconds':seconds
        };

    }

    function getZero(num){ // добавляем 0 к числам меньше 10
        if(num>= 0 && num < 10){
            return `0${num}`;
        }
        else {
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

             if(t.total <= 0 ){
                
                clearInterval(timeInterval);
                days.innerHTML = 10;
                hours.innerHTML = 10; //по умолчанию при отрицательном
                minutes.innerHTML = 10;
                seconds.innerHTML = 10;
             }
         }

    }


setClock('.timer', deadLine);


});