window.addEventListener('DOMContentLoaded', ()=>{
    const body = document.querySelector('body');
    let textNodes =[];

    function recursy (element) {
        element.childNodes.forEach(node => {
            if(node.nodeName.match(/^H\d/)){ //находим все заголовки всех порядков
               const obj = {
                    header: node.nodeName,
                    content: node.textContent.trim()
               };
                textNodes.push(obj);
                
            } else {
                recursy(node);
            }
        });
    }

    recursy(body);

    // кидаем в мою бд
    
    fetch('http://localhost:3000/parser', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(textNodes)
    })
    .then(response => response.json())
    .then(json => console.log(json));
});