
class IconBadge extends HTMLElement{
    get icon(){
        if(this.getAttribute('icon') == undefined || this.getAttribute('icon') == 'undefined') return undefined;
        return this.getAttribute('icon');
    }
    get label(){
        if(this.getAttribute('label') == undefined || this.getAttribute('label') == 'undefined') return undefined;
        return this.getAttribute('label');
    }
    constructor(){
        super();
        this.attachShadow({mode: "open"})
    }
    connectedCallback(){
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = "";
        let style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'IconBadge.css';
        this.shadowRoot.append(style);

        if(this.icon){
            let icon = document.createElement('img');
            icon.className = 'icon'
            icon.src = `https://unpkg.com/simple-icons@v5/icons/${this.icon}.svg`
            this.shadowRoot.append(icon)
        }
        let label = document.createElement('span');
        label.innerHTML = this.label
        this.shadowRoot.append(label)
    }
}

customElements.define('icon-badge-item', IconBadge)