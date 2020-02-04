


class AltBlog{
    //Sub-Classes
    static Card;
    static User;
    static Editor;
    static UI;

    //Static properties to be accessed externally
    static sections;
    static permissions;
    static currentUser;

    state = {
        page: '',
        params: {}
    }

    async getData(){
        this.posts = await this._constructorProps.data()
    }

    constructor(props){
        this._constructorProps = props;
        
        // Define static props
        AltBlog.sections = props.sections;
        AltBlog.currentUser = props.currentUser ? props.currentUser : new AltBlog.User('guest', 'guest');
        
        this.container = props.allPosts ? props.allPosts : document.body;
        this.container.classList.add('AltBlog_Cont')
        
        this.update = (id, post)=>{
            props.update(id, post);
            alert('done');
            this.getData().then(()=>{ this.openPost(post) })
        }

        this.delete = (id, post)=>{
            if(confirm("¿Borrar el post? \n Esta accion no se puede deshacer")){
                props.delete(id, post);
                this.getData().then(()=>{ this.showPosts() });
            }
        }

        this.login = ()=>{
            let username = prompt("AltBlog Login \nUsername");
            let password = prompt("AltBlog Login \nPassword");
            props.login(username, password);
        }

        this.create = props.create; 
        
        if(props.navBar && props.navBar.visible){
            this.navBar = new AltBlog.UI.NavBar(props.navBar, this);
        }

        this.fileUpload = props.fileUpload;
    }

    showPosts(f=(i)=>true){
        this.navBar.cancelSelection();
        document.title = 'Watermelon';
        //Empty container
        this.container.innerHTML = '';
        //Filter, then append
        this.posts.filter(f).forEach(l => {
            this.container.append( new AltBlog.Card(l, this).dom );
        });
        //New post button
        let newPost = document.createElement('div');
        newPost.classList.add('AltBlog_FAB', '__editor-publish');        
        newPost.addEventListener('click', ()=>{
            this.openPost();
 
        })
        this.container.append(newPost);
    }

    openPost(post={}){
        document.title = post.title ? post.title : 'New Post';
        //history.pushState({post: post}, post.title ? post.title : 'New Post', "");
        //Empty container
        this.container.innerHTML = "";
        let editor = new AltBlog.Editor(post, this, AltBlog.currentUser.email == post.author);
        this.container.append(editor.dom);
    }

    changeCurrentUser(user){
        AltBlog.currentUser = user;
        if(this.navBar){
            this.navBar.changeUser();
        }
    }
    /*updatePost(id, post){
         
    }*/

}

AltBlog.Card = class{
    constructor(props, _altBlog){
        this.dom = document.createElement('div');

        let tag = document.createElement('span');
        tag.classList.add('tag')

        let title = document.createElement('h1');
        let subtitle = document.createElement('span');

        title.innerHTML = props.title;
        subtitle.innerHTML = props.subtitle;
        tag.innerHTML = props.section ? props.section : 'Categoría';

        this.dom.append(tag, title, subtitle);
        this.dom.classList.add('AltBlog_Card');
        this.dom.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 80%, rgba(0, 0, 0, 0.8) 100%), url(${props.image})`

        this.dom.addEventListener('click', ()=>{
            _altBlog.openPost(props);
        })

    }
}

AltBlog.User = class{
    constructor(uid, data){
        this.uid = uid;
        for (const key in data) {
            this[key] = data[key]
        }
    }
}

AltBlog.Editor = class{
    constructor(params, _altBlog){
        this.dom = document.createElement('div');
        this.dom.classList.add('AltBlog_Editor_Cont');

        let header = document.createElement('div');
        header.classList.add('AltBlog_Editor_Header')
        header.style.background = `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 80%, rgba(0, 0, 0, 0.8) 100%), url(' ${params.image ? params.image : ''}')`

        this.title = document.createElement('h1');
        this.title.innerText = params.title ? params.title : 'Título';

        this.subtitle = document.createElement('h2');
        this.subtitle.innerText = params.subtitle ? params.subtitle : 'Subtitulo';

        this.section = document.createElement('span');
        this.section.classList.add('tag')
        this.section.innerText = params.section ? params.section : 'Categoría';

        let author = params.author ? params.author : AltBlog.currentUser.uid;

        let byline = document.createElement('div');
        byline.classList.add('AltBlog_Editor_Byline');
        byline.innerHTML = `Por ${ author } `;

        let headerButton = document.createElement('input');
        headerButton.type = "file";

        header.append(this.section, this.title, this.subtitle)

        header.addEventListener('click', e=>{
            e.preventDefault();
            e.stopImmediatePropagation();
            headerButton.click()
        }) 
        headerButton.addEventListener('change', (e)=>{
            //console.log(e.target.files[0])
            _altBlog.fileUpload(e.target.files[0], params.id+"/header", (data)=>{
                data.ref.getDownloadURL().then(url=>{
                    console.log(url);
                    params.image = url
                })
            })
        })


        this.commands = document.createElement('div');
        this.commands.classList.add('AltBlog_Editor_Header-Commands');

        let commands_delete = document.createElement('button');
        commands_delete.textContent = 'Eliminar'
        commands_delete.addEventListener('click', ()=>{ _altBlog.delete(params.id, params) })

        this.commands_section = document.createElement('select');
        AltBlog.sections.forEach(i=>{
            let option = document.createElement('option');
            option.value = i;
            option.innerHTML = i;
            this.commands_section.append(option)
        })
        this.commands_section.selectedIndex = AltBlog.sections.indexOf( params.section ) ? AltBlog.sections.indexOf( params.section ) : 0

        this.commands.append(this.commands_section, commands_delete)

        this.editor_cont = document.createElement('div');
        this.editor_cont.classList.add('AltBlog_Editor_editorCont')

        this.publish_btn = document.createElement('div');
        this.publish_btn.classList.add('AltBlog_FAB', '__editor-publish');
        this.publish_btn.addEventListener('click', ()=>{
            this.getData(_altBlog).then((data)=>{
                if(params.id){
                    _altBlog.update(params.id, {...params, ...data})
                } else {
                    _altBlog.create({...params, ...data, author})
                }
            })

        })

        this.dom.append(header, this.commands, byline, this.editor_cont, this.publish_btn)

        this.editor = new EditorJS({
            tools: { 
                header: Header,
                image: SimpleImage,
                list: {
                    class: List,
                    inlineToolbar: true,
                }, 
                paragraph: {
                    class: Paragraph, 
                    inlineToolbar: true
                }, 
                //raw: RawTool,
                code: CodeTool, 
                table: Table,
                embed: {
                    class: Embed, 
                    inlineToolbar: true,
                },
                math: Latex
            },
            placeholder: "Empiece a escribir o presione tab para añadir contenido", 
            holder: this.editor_cont,
            data: params,
            onReady:()=>{
                if(params.author != AltBlog.currentUser.email){
                    this.readOnly();
                }
            }
        });
        this.title.contentEditable = "true";
        this.subtitle.contentEditable = "true";
    }

    async getData(_altBlog){
        let editorData = await this.editor.save();
        return {
            ...editorData,
            title: this.title.innerText,
            subtitle: this.subtitle.innerText,
            author: AltBlog.currentUser.email,
            section: this.commands_section.value
        }
    }

    readOnly(){
        this.dom.removeChild(this.commands)
        this.dom.removeChild(this.publish_btn)
        let content = this.editor_cont.innerHTML;
        this.editor.destroy();
        this.editor_cont.innerHTML = content;
        this.dom.querySelectorAll('[contenteditable]').forEach(l=>{
            l.contentEditable = false;
        })
        this.dom.querySelectorAll('textarea').forEach(l=>{
            l.disabled = true;
        })
    }

}

AltBlog.UI = {
    NavBar: undefined,
    Cover: undefined
}

AltBlog.UI.NavBar = class {
    constructor(params, _altBlog){
        this._altBlog = _altBlog;
        this.dom = document.createElement('div');
        this.dom.classList.add('AltBlog_UI_NavBar');

        let logo = document.createElement('img');
        logo.src = params.logo;

        logo.addEventListener('click', ()=>{
            _altBlog.showPosts();
        })

        let search = document.createElement('input');
        search.type='search';
        search.placeholder = 'Buscar';

        search.addEventListener('input', ()=>{
            _altBlog.showPosts(i=>( i.title.includes(search.value) || i.subtitle.includes(search.value) ))
        })

        let navCont = document.createElement('div');
        //navCont.innerHTML = JSON.stringify(params.categories)
        navCont.classList.add('AltBlog_UI_NavBar-Nav')
        
        navCont.append(logo)

        AltBlog.sections.forEach(l=>{
            let item = document.createElement('span');
            item.innerHTML = l;
            item.addEventListener('click', ()=>{
                _altBlog.showPosts(i=>(i.section == l))
                this.cancelSelection();
                item.classList.add('active')   
            })
            navCont.append(item)
        })


        this.user = document.createElement('div');
        this.user.classList.add('AltBlog_UI_Navbar-User')

        this.dom.append(navCont, search, this.user)
        document.body.prepend(this.dom)
    }
    changeUser(){
        this.user.style.background = `url('${AltBlog.currentUser.photoUrl}')`
    }
    cancelSelection(){
        document.querySelectorAll('.AltBlog_UI_NavBar-Nav span').forEach(i=>{
            i.classList.remove('active')
        })
    }
};
