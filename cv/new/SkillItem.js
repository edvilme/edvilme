const svgs = {
    'JavaScript': 'javascript', 
    'Python': 'python',
    'SQL': 'mysql', 
    'C++': 'cplusplus',
    'C#': 'csharp',
    'Java': 'java', 
    'React': 'react',
    'Node.js': 'nodedotjs',
    'Express.js': 'express',
    'Rest APIs': 'postman', 
    'WebAssembly': 'webassembly', 
    'Web Components': 'webcomponentsdotorg',
    'MariaDB': 'mariadb', 
    'MySQL': 'mysql', 
    'PostgreSQL': 'postgresql',
    'Postgres': 'postgresql',
    'MongoDB': 'mongodb',
    'Firebase': 'firebase',
    'Tableau': 'tableau', 
    'd3.js': 'd3dotjs',
    'Plotly': 'plotly'
}

class SkillItem extends HTMLElement{
    get name(){
        return this.getAttribute('skill-name')
    }
    keywords = [];
    constructor(){
        super();
        this.attachShadow({mode: "open"})
    }
    connectedCallback(){
        this.render()
    }
    render(){
        this.shadowRoot.innerHTML = "";
        let style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'SkillItem.css';
        this.shadowRoot.append(style) 

        let name = document.createElement('name');
        name.className = 'name';
        name.innerHTML = this.name;
        this.shadowRoot.append(name)
        for(let keyword of this.keywords){
            let keywordItem = document.createElement('icon-badge-item');
            keywordItem.setAttribute('icon', svgs[keyword]);
            keywordItem.setAttribute('label', keyword);
            this.shadowRoot.append(keywordItem)
        }
    }
    addKeywords(keyword){
        this.keywords.push(keyword);
        this.render();
    }
}

customElements.define('skill-item', SkillItem);