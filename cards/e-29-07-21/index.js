const generateNewPosition = (o_x, o_y, distance) => {
    const randomAngle = Math.random()*2*Math.PI;
    const x = o_x + Math.cos(randomAngle)*distance;
    const y = o_y + Math.sin(randomAngle)*distance;
    if(x < 0 || y < 0 || x > window.outerWidth || y > window.outerHeight) return generateNewPosition(o_x, o_y, distance)
    return {x, y}
}

const emoji = [
    '🎂', '🎁', '🎊', 
]

let count = 0;

const generateTag = (x = 0, y = 0) => {
    if(count>100) return;
    count++;
    const span = document.createElement('span');
    span.className = 'tag';
    span.innerHTML = 'Felicidades ' + emoji[count%emoji.length];

    span.style.left = x + 'px';
    span.style.top = y + 'px';

    setInterval(()=>{
        const {x, y} = generateNewPosition(parseInt(span.style.left), parseInt(span.style.top), 200);
        span.style.left = x + 'px';
        span.style.top = y + 'px';
    }, 1000);

    span.addEventListener('click', ()=>{
        generateTag(parseInt(span.style.left), parseInt(span.style.top))
    })

    document.body.append(span);
}