window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
          modal = require ('./modules/modal'),
          cards = require ('./modules/cards'),
          calc = require ('./modules/calc'),
          forms = require ('./modules/forms'),
          slider = require ('./modules/slider'),
          timer = require ('./modules/timer');
          
    tabs();
    modal();
    cards();
    calc();
    forms();
    slider();
    timer();

});
