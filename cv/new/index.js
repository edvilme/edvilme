/* const svgs = {
    'JavaScript': 'javascript', 
    'Python': 'python',
    'SQL': 'mysql', 
    'C++': 'cplusplus',
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
    'Firebase': 'firebase'
} */

async function getData(){
    const data = await (await fetch('../cv.json')).json();

    document.querySelector('#basics-name').innerHTML = data?.['basics']?.['name'] || "Name"
    document.querySelector('#basics-label').innerHTML = data?.['basics']?.['label'] || "Label"
    document.querySelector('#basics-summary').innerHTML = data?.['basics']?.['summary'] || "summary"

    data?.['basics']?.['profiles'].forEach(({network, url, username}) => {
        let item = document.createElement('li');
        let link = document.createElement('a');
        link.href = url;
        let iconBadge = document.createElement('icon-badge-item');
        iconBadge.setAttribute('icon', network);
        iconBadge.setAttribute('label', username);
        link.append(iconBadge);
        item.append(link);
        document.querySelector('#basics-profiles').append(item)
    })

    data?.['work'].forEach(({name, description, startDate, endDate, position, highlights, url}) => {
        let item = document.createElement('work-experience-item');
        item.setAttribute('work-name', name);
        item.setAttribute('work-description', description);
        item.setAttribute('work-start-date', startDate);
        item.setAttribute('work-end-date', endDate);
        item.setAttribute('work-position', position);
        item.setAttribute('work-url', url);
        highlights.forEach(item.pushHighlight.bind(item))
        document.querySelector('#work').append(item)
    })
    data?.['volunteer'].forEach(({organization, summary, startDate, endDate, position, highlights, url}) => {
        let item = document.createElement('work-experience-item');
        item.setAttribute('work-name', organization);
        item.setAttribute('work-description', summary);
        item.setAttribute('work-start-date', startDate);
        item.setAttribute('work-end-date', endDate);
        item.setAttribute('work-position', position);
        item.setAttribute('work-url', url);
        highlights.forEach(item.pushHighlight.bind(item))
        document.querySelector('#volunteer').append(item)
    })
    data?.['awards'].forEach(({date, title, awarder, summary}) => {
        let item = document.createElement('award-item');
        item.setAttribute('award-date', date)
        item.setAttribute('award-title', title)
        item.setAttribute('award-awarder', awarder)
        item.setAttribute('award-summary', summary)
        document.querySelector('#awards').append(item)

    })
    data?.['skills'].forEach(({name, keywords}) => {
        let item = document.createElement('skill-item');
        item.setAttribute('skill-name', name);
        keywords.forEach(item.addKeywords.bind(item))
        document.querySelector('#skills').append(item)
    })

    data?.['education'].forEach(({startDate, endDate, area, institution}) => {
        let item = document.createElement('education-item');
        item.setAttribute('education-start-date', startDate)
        item.setAttribute('education-end-date', endDate)
        item.setAttribute('education-area', area)
        item.setAttribute('education-institution', institution);
        document.querySelector('#education').append(item)
    })
}

getData();