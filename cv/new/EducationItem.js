class EducationItem extends HTMLElement{
    get startDate(){
        let date = new Date(this.getAttribute('education-start-date'));
        return date.toLocaleDateString(undefined, {
            month: "2-digit", 
            year: "numeric"
        })
    }
    get endDate(){
        if(this.getAttribute('education-end-date') == undefined || this.getAttribute('education-end-date') == 'undefined') return 'Pursuing';
        let date = new Date(this.getAttribute('education-end-date'));
        return date.toLocaleDateString(undefined, {
            month: "2-digit", 
            year: "numeric"
        })
    }
    get area(){
        return this.getAttribute('education-area')
    }
    get institution(){
        return this.getAttribute('education-institution')
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
        style.href = 'EducationItem.css';
        this.shadowRoot.append(style) ;

        let duration = document.createElement('span');
        duration.className = 'duration';
        duration.innerHTML = `${this.startDate} to ${this.endDate}`

        let area = document.createElement('span');
        area.className = 'area';
        area.innerHTML = this.area;

        let institution = document.createElement('span');
        institution.className = 'institution';
        institution.innerHTML = this.institution;

        this.shadowRoot.append(institution, duration, area)


    }
}
customElements.define('education-item', EducationItem)