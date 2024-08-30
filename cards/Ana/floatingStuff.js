Math.randomRange = (min, max) => Math.floor(Math.random() * (max-min+1)+min);

class FloatingDuplicatingStuff{
    static count=0;

    updatePosition(i=0){
        if(i==5) return;
        let left = Math.randomRange(0, this.parent.clientWidth);
        let top = Math.randomRange(0, this.parent.clientHeight)
        if( Math.sqrt( (left-this.lastLeft)**2 + (top-this.lastTop)**2 ) < 15 || Math.sqrt( (left-this.lastLeft)**2 + (top-this.lastTop)**2 ) > 100){
            this.updatePosition(i+1);
            return;
        }
        this.lastLeft = left;
        this.lastTop = top;
        let angle = Math.randomRange(0, 2*Math.PI);
        let distance = Math.randomRange(0, 2)
        left += distance*Math.sin(angle);
        top += distance*Math.cos(angle)

        Object.assign(this.dom.style, {left: left+'px', top: top+'px'})
    }
    /**
     * Adds a new element to parent 
     * @param {HTMLElement} element Element to generate
     * @param {HTMLElement} parent WHere to generate it
     */
    constructor(element, parent){
        FloatingDuplicatingStuff.count++;
        if(FloatingDuplicatingStuff.count%10==0){
            let heartEmoji = Object.assign(document.createElement('img'), {
                src: './img/heart-emoji.png',
                onclick: ()=>{kisses.style.backgroundColor = randomColor({luminosity: 'light', hue: 'pink'});}
            });
            Object.assign(heartEmoji.style, {
                height: '60px', 
                width: '60px',
            })
            return new FloatingDuplicatingStuff(heartEmoji,parent);
        }
        if(FloatingDuplicatingStuff.count>90){
            alert("Ya no caben, pero quiero darte esos y más. Te amo guapa");
            return;
        }
        this.parent = parent;
        this.dom = element;
        this.dom.style.position = 'absolute';
        this.dom.style.transition = 'top 2s ease-in-out, left 2s ease-in-out'

        setInterval(()=>{
            window.requestAnimationFrame( this.updatePosition.bind(this) )
        }, 2000)
        this.dom.addEventListener('click', this.clone.bind(this));
        parent.append(this.dom);
    }

    clone(){
        return new FloatingDuplicatingStuff(this.dom.cloneNode(true), this.parent)
    }

}