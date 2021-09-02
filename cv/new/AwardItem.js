class AwardItem extends HTMLElement{
    get date(){
        let date = new Date(this.getAttribute('award-date'));
        return date.toLocaleDateString(undefined, {
            month: "2-digit", 
            year: "numeric"
        })
    }
    get title(){
        return this.getAttribute('award-title');
    }
    get awarder(){
        return this.getAttribute('award-awarder');
    }
    get summary(){
        return this.getAttribute('award-summary')
    }
    constructor(){
        super();
        this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = "";
        let style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'AwardItem.css';
        this.shadowRoot.append(style) 
        this.shadowRoot.append(this.renderHeader())

        let title = document.createElement('span');
        title.className = 'title';
        title.innerHTML = this.title;
        
        let summary = document.createElement('span');
        summary.className = 'summary';
        summary.innerHTML = this.summary;
        
        this.shadowRoot.append(title, summary);
        /* this.shadowRoot.innerHTML = JSON.stringify({
            date: this.date, 
            title: this.title, 
            awarder: this.awarder, 
            summary: this.summary
        }) */
    }

    renderHeader(){
        let header = document.createElement('div');
        header.className = 'header';
        let date = document.createElement('span');
        date.className = 'date';
        date.innerHTML = this.date;
        let awarder = document.createElement('span');
        awarder.className = 'awarder';
        awarder.innerHTML = this.awarder;
        header.append(date, awarder);
        return header;
    }
}

customElements.define('award-item', AwardItem)