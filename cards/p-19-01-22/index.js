// Utils
const sleep = t => new Promise(s => setTimeout(s, t));

// Render initial text

const FELIZ_CUMPLEANOS_ASCII = [
    "______   _ _                                  _             /\\/|           ",
    "|  ____| | (_)                                | |           |/\\/            ",
    "| |__ ___| |_ ____   ___ _   _ _ __ ___  _ __ | | ___  __ _ _ __   ___  ___ ",
    "|  __/ _ \\ | |_  /  / __| | | | '_ ` _ \\| '_ \\| |/ _ \\/ _` | '_ \\ / _ \\/ __|",
    "| | |  __/ | |/ /  | (__| |_| | | | | | | |_) | |  __/ (_| | | | | (_) \\__ \\",
    "|_|  \\___|_|_/___|  \\___|\\__,_|_| |_| |_| .__/|_|\\___|\\__,_|_| |_|\\___/|___/",
    " ", 
    "...................................................................................",
    "                                                                                   ", 
    "> Esta es tu primer sorpresa del día...............................................", 
    "> Así que espero que estés listo...................................................", 
    "                        ",
    "> ¿Estás listo? (y/n)" 
]

const IMAGENES = [
    './img/foto-1.jpeg',
    './img/foto-2.jpeg',
    './img/foto-3.jpeg',
    './img/foto-4.jpeg',
    './img/foto-5.jpeg',
    './img/foto-6.jpeg',
    './img/foto-7.jpeg',
    './img/foto-8.jpeg',
    './img/foto-9.jpeg',
    './img/foto-10.jpeg',
]

async function writeHeaderPrompt(){
    document.querySelector('header').innerHTML = 0;
    for(let row of FELIZ_CUMPLEANOS_ASCII){
        const div = document.createElement('div');
        document.querySelector('header').append(div);
        for(let char of row){
            if(char == ' '){
                await sleep(25);
            } else {
                await sleep(50);
            }
            div.innerHTML += char;
        }
    }
    /**
     * @param {KeyboardEvent} e 
     */
    function promptCallback(e){
        if(e.key == 'n') return alert("¿Cómo de que no? Pónte listo y di que sí");
        if(e.key == 'y'){
            window.location.href = "#message";
            document.querySelector('body').style.overflow = 'auto';
            document.querySelector('body').removeEventListener('keydown', promptCallback);
        }
    }
    document.querySelector('body').addEventListener('keydown', promptCallback);
}
writeHeaderPrompt();

function generateCollage(){
    for(let src of IMAGENES){
        let img = document.createElement('img');
        img.setAttribute('src', src);
        document.querySelector('#collage').append(img);

        let left =  Math.random()*80;
        let top = Math.random()*80;
        let rotation = Math.random()*Math.PI/2;
        img.style.transform = `rotate(${rotation}rad)`;
        img.style.left = `${left}%`;
        img.style.top = `${top}%`;
    }
}
generateCollage();