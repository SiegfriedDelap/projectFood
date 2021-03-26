function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //прокрутка не работает
    
    if(modalTimerId) {
        clearInterval(modalTimerId); //если пользователь сам открыл модалку, то мы больше его не задрачиваем
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    //modal.classList.toggle('show');
    document.body.style.overflow = '';

}


function modal(triggerSelector, modalSelector, modalTimerId) {

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    //открытие модального окна


    modalTrigger.forEach(btn => {

    clearInterval(modalTimerId); //если пользователь сам открыл модалку, то мы больше его не задрачиваем
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId ));

    });



    //клик вне области модального окна закрывает его
    modal.addEventListener('click', (e) => {

        if (e.target === modal || e.target.getAttribute('data-close') == '') {

            closeModal(modalSelector);

        }


    });

    //Esc закрывает модальное окно
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });


    //долистали до конца вызвали модалку

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


}

export default modal;
export {closeModal};
export {openModal};