class WorkExperienceItem extends HTMLElement{
    get startDate(){
        let date = new Date(this.getAttribute('work-start-date'));
        return date.toLocaleDateString(undefined, {
            month: "2-digit", 
            year: "numeric"
        })
    }
    get endDate(){
        if(this.getAttribute('work-end-date') == undefined || this.getAttribute('work-end-date') == 'undefined') return 'Present';
        let date = new Date(this.getAttribute('work-end-date'));
        return date.toLocaleDateString(undefined, {
            month: "2-digit", 
            year: "numeric"
        })
    }
    get position(){
        return this.getAttribute('work-position')
    }
    get name(){
        return this.getAttribute('work-name')
    }
    get description(){
        return this.getAttribute('work-description')
    }
    get url(){
        if(this.getAttribute('work-url') == undefined || this.getAttribute('work-url') == 'undefined') return undefined;
        return this.getAttribute('work-url')
    }
    highlights = []
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
        style.href = 'WorkExperienceItem.css';
        this.shadowRoot.append(style) 
        let duration = document.createElement('span');
        duration.className = 'duration';
        duration.innerHTML = `${this.startDate} to ${this.endDate}`;
        let info = document.createElement('div');
        info.className = 'info';
        let position = document.createElement('span');
        position.className = 'info-position';
        position.innerHTML = this.position;
        let name = document.createElement('span');
        name.className = 'info-name';
        name.innerHTML = '@ ' + this.name;
        let description;
        if(this.url){
            description = document.createElement('a');
            description.href = this.url;
        } else {
            description = document.createElement('p');
        }
        description.className = 'info-description';
        description.innerHTML = this.description;
        info.append(position, name, description)
        this.shadowRoot.append(duration, info, this.renderHighlights());
    }
    renderHighlights(){
        let list = document.createElement('div');
        list.className = 'highlights';
        for(let highlight of this.highlights){
            let item = document.createElement('span');
            item.innerHTML = highlight;
            list.append(item)
        }
        return list;
    }

    pushHighlight(highligt){
        this.highlights.push(highligt);
        this.render();
    }
}

customElements.define('work-experience-item', WorkExperienceItem)