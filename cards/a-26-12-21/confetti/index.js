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