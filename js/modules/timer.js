function timer(id, deadline) {

    //Timer

    

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


    setClock(id, deadline);

}

export default timer;