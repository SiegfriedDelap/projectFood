function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            // item.style.display = 'none'; //скрываем табы inline

            item.classList.add('hide'); //добавили класс
            item.classList.remove('show', 'fade'); //убрали ненужный

        });

        tabs.forEach(item => {

            item.classList.remove(activeClass); //убираем класс активности у всех табовы

        });
    }

    function showTabContent(i = 0) { //передаем какой элемент хотим показать, i = 0 дефолт значение 
        // tabsContent[i].style.display = 'block'; //inline вариант смены стиля
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }



    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {

        const target = e.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
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
}
export default tabs;