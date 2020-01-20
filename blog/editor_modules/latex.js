

class Latex {
    static get toolbox(){
        return {
            title: 'Math',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7V4z"/></svg>'
        };
    }
    render(){
        let a = document.createElement('math');
        a.innerText = " '$$\\frac{a}{1-a^2}$$'"
        return a 
    }

    save(blockContent){
        return {
          url: blockContent.value
        }
      }
}