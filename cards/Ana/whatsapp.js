const WhatsAppUtils={
    containsOnlyEmojis(text) {
        const onlyEmojis = text.replace(new RegExp('[\u0000-\u1eeff]', 'g'), '')
        const visibleChars = text.replace(new RegExp('[\n\r\s]+|( )+', 'g'), '')
        return onlyEmojis.length === visibleChars.length
    }
}

class WhatsAppInput{
    constructor(){}
    render(){
        let customEvent = new CustomEvent('message');
        this.dom = Object.assign(document.createElement('div'), {className: 'whatsapp-input'})
        let input = Object.assign(document.createElement('input'), {
            type: 'text', 
            name: 'whatsapp-input',
            id: 'whatsapp-input', 
            placeholder: 'Type a message here'
        });
        input.addEventListener('keyup', e=>{
            if(e.keyCode===13){
                customEvent.initCustomEvent('message', false, false, input.value)
                this.dom.dispatchEvent(customEvent);
            }
        })
        let button = document.createElement('button');
        button.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>`;
        button.addEventListener('click', e=>{
            customEvent.initCustomEvent('message', false, false, input.value)
            this.dom.dispatchEvent(customEvent);
        })
        this.dom.append(input, button);
        return this.dom;
    }
}

class WhatsappInfo{
    message;
    constructor(message){this.message=message}
    render(){
        this.dom = Object.assign(document.createElement('div'), {
            className: 'whatsapp-info',
            innerHTML: this.message
        })
        return this.dom;
    }
}

class WhatsAppMessage{
    text;
    direction;
    constructor(text, direction){
        this.text = text;
        this.direction = direction;
    }
    render(){
        this.dom = Object.assign(document.createElement('div'), {
            className: `whatsapp-bubble ${this.direction}`,
            innerHTML: this.text
        });
        if(WhatsAppUtils.containsOnlyEmojis(this.text)) this.dom.classList.add('emoji')
        return this.dom;
    }
}



class WhatsAppChat {
    messages = [
        new WhatsAppMessage('Hola guapa hermosa, te amo ❤', 'incoming'),
        new WhatsAppMessage('Que tengas un buen día hoy', 'incoming'),
        new WhatsAppMessage('Hola Lolito guapooo', 'outgoing'),
        new WhatsAppMessage('Graciaaas, igual tú', 'outgoing'),
        new WhatsAppMessage('Aww igual te amoo', 'outgoing'),
        new WhatsappInfo('Llamada de 2 horas'),
        new WhatsAppMessage('LOL nos dieron las 4 de la mañana', 'outgoing'),
        new WhatsAppMessage('Jajaja ya sé, se me pasa volando', 'incoming')
    ];
    constructor(){
        this.dom = Object.assign(document.createElement('div'), {
            className: 'whatsapp-container'
        })
    }
    addMessage(text, direction){
        let message = new WhatsAppMessage(text, direction)
        this.messages.push( message );
        this.dom.innerHTML = "";
        this.render()
    }

    render(){
        for(let message of this.messages){
            this.dom.append(message.render())
        }
        let input = (new WhatsAppInput()).render();
        this.dom.append( input );
        input.addEventListener('message', ({detail})=>{
            this.addMessage(detail, 'outgoing')
            if(detail.toLowerCase() == 'te amo' || detail.toLowerCase() == 'te amo lolito') {
                this.addMessage('Yo te amo más guapa', 'incoming')
            }
            if(detail.toLowerCase().startsWith('hola')){
                this.addMessage('Hola guapa', 'incoming')
            }
            if(detail.toLowerCase().startsWith('aww')){
                this.addMessage('❤', 'incoming')
            }
            if([...new Set(...detail.toLowerCase())][0] == '❤'){
                this.addMessage('❤', 'incoming')
            }
        })
        return this;
    }
}