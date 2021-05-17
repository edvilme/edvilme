async function renderCV(){
    const cv = await (await fetch('/cv.json')).json();
    const {basics, languages, education, work, volunteer, awards} = cv;
    {
        // Basics
        const {email, location, label, name, summary, profiles} = basics;
        document.querySelector('#name').innerHTML = name;
        document.querySelector('#label').innerHTML = label;
        profiles.forEach(({network, url, username}) => {
            let template = document.querySelector('#template-social-profile').content;
            template.querySelector('.social-profile-link').href = url;
            template.querySelector('.social-profile-icon').src = `https://simpleicons.org/icons/${network.toLowerCase()}.svg`;    
            template.querySelector('.social-profile-username').innerHTML = username;
            document.querySelector('#profiles').append(document.importNode(template, true))
        })

    }

    {
        work
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        .forEach(({name, description = '', startDate, endDate, position, summary, url}, i) => {
            let templateWorkRole = document.querySelector('#template-work-role').content;
            let startDateString = new Date(startDate).toLocaleDateString(undefined, {month: 'numeric', year: 'numeric'});
            let endDateString = endDate ? new Date(endDate).toLocaleDateString(undefined, {month: 'numeric', year: 'numeric'}) : 'Present';

            templateWorkRole.querySelector('.work-duration').innerHTML = `${startDateString} - ${endDateString}`;
            templateWorkRole.querySelector('.work-position').innerHTML = position;
            templateWorkRole.querySelector('.work-summary').innerHTML = summary;
            
            const isSameEmployer = i != 0 && work[i-1].name != name;
            if(i == 0 || work[i-1].name != name){
                let template = document.querySelector('#template-work').content;
                template.querySelector('.work-name').innerHTML = name;
                template.querySelector('.work-description').innerHTML = description;
                document.querySelector('#work').append(document.importNode(template, true))
            }
            document.querySelector('#work').lastElementChild.append(document.importNode(templateWorkRole, true));

        })
    }

    {
        volunteer
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        .forEach(({organization: name, description, startDate, endDate, position, summary, url, highlights}, i) => {
            let templateWorkRole = document.querySelector('#template-work-role').content;
            let startDateString = new Date(startDate).toLocaleDateString(undefined, {month: 'numeric', year: 'numeric'});
            let endDateString = endDate ? new Date(endDate).toLocaleDateString(undefined, {month: 'numeric', year: 'numeric'}) : 'Present';

            templateWorkRole.querySelector('.work-duration').innerHTML = `${startDateString} - ${endDateString}`;
            templateWorkRole.querySelector('.work-position').innerHTML = position;
            templateWorkRole.querySelector('.work-summary').innerHTML = summary;
            templateWorkRole.querySelector('.work-highlights').innerHTML = '';
            highlights?.forEach(highlight => {
                templateWorkRole.querySelector('.work-highlights').append(
                    Object.assign(document.createElement('li'), {innerHTML: highlight})
                )
            })

            if(i == 0 || volunteer[i-1].organization != name){
                let template = document.querySelector('#template-work').content;
                template.querySelector('.work-name').innerHTML = name;
                template.querySelector('.work-description').innerHTML = "";
                document.querySelector('#volunteer').append(document.importNode(template, true))
            }
            document.querySelector('#volunteer').lastElementChild.append(document.importNode(templateWorkRole, true));

        })
    }
    {
        education
        .forEach(({area, institution, startDate, endDate, studyType, courses}) => {
            let template = document.querySelector('#template-education').content;
            template.querySelector('.education-duration').innerHTML = `${startDate} - ${endDate || 'Pursuing'}`
            template.querySelector('.education-area').innerHTML = area;
            template.querySelector('.education-institution').innerHTML = institution;
            document.querySelector('#education').append(document.importNode(template, true))
        })
    }
    {
        awards
        .forEach(({awarder, date, title, summary}) => {
            let template = document.querySelector('#template-awards').content;
            template.querySelector('.award-date').innerHTML = date;
            template.querySelector('.award-title').innerHTML = title;
            template.querySelector('.award-awarder').innerHTML = awarder;
            template.querySelector('.award-summary').innerHTML = summary;
            document.querySelector('#awards').append(document.importNode(template, true));
        })
    }
}

renderCV();