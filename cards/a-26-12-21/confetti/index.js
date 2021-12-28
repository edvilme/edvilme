/**
 * Para Ana:
 * De todas las personas creo que 
 * tú eres quien mejor me conoce,
 * y quien mejor sabe lo mucho que
 * me apasiona hacer estas cosas.
 * 
 * Sin embargo, mi pasión más grande
 * en todo el mundo, eres tú.
 * Constantemente y en todo lo que hago,
 * pienso siempre en tí.
 * 
 * Por eso para tu cumpleaños quise 
 * hacerte esta carta, como forma de
 * decirte que quiero robarme tu 
 * corazón y que usaré todas las armas
 * que tenga disponible para hacerlo.
 * 
 * Te quiero muchísimo y espero que
 * hayas tenido un muy feliz cumpleaños.
 * Aún te debo un abrazo, un beso y una cita.
 * 
 * Te extraño y te amo,
 * Lalo. 
 */

import 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js';

const sleep = t => new Promise(s => setTimeout(s, t));

let count = 0;

document.body.addEventListener('click', e=>{
    if(!e.target.classList.contains('balloon')) return;
    confetti({
        particleCount: 100,
        spread: 70,
        origin: {x: e.x/window.innerWidth, y: e.screenY/window.innerHeight}
    });
    e.target.style.transform = 'scale(0)'
    e.target.remove()

    count++;
    if(count > Number.parseInt(localStorage.getItem('high-score') || 0)){
        localStorage.setItem('high-score', count.toString());
    }

    updateScore();
})

function updateScore(){
    document.querySelector('#current-score').innerHTML = " " + count;
    document.querySelector('#high-score').innerHTML = " " + Number.parseInt(localStorage.getItem('high-score') || 0);
}

updateScore();