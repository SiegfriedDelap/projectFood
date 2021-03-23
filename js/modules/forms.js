function forms() {

    //Отправка данных на вебсервер

    const forms = document.querySelectorAll('form');

    //Ошибки сообщения, нужно поместить на страницу
    const message = {
        loading: 'img/form/spinner.svg',
        succes: 'Спасибо! Mы скоро с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
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
            statusMessage.style.cssText = `
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
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
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

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);

    }


}

module.exports = forms;