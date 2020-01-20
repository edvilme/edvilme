// This document configures AltBlog to the specified settings. Check documentation for details

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBaAIgZY3coG_Vlhv5UdZrqrlxTeLm_-RE",
    authDomain: "watermelon-974ca.firebaseapp.com",
    databaseURL: "https://watermelon-974ca.firebaseio.com",
    projectId: "watermelon-974ca",
    storageBucket: "watermelon-974ca.appspot.com",
    messagingSenderId: "458674442702",
    appId: "1:458674442702:web:42fa5b0b32ce9253381b9f",
    measurementId: "G-YMWDNF8GGQ"
}; 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.firestore();

firebase.auth().onAuthStateChanged(user=>{
    if(user){
        Blog.changeCurrentUser(new AltBlog.User(user.uid, (({displayName, email, photoUrl})=>({displayName, email, photoUrl}))(user)))
    }
})

let Blog = new AltBlog({
    data: async ()=>{
        let posts = await db.collection("posts").get();
        return posts.docs.map((l, i)=>({id: l.id, ...l.data()}));
    }, 
    login: (username, password)=>{
        firebase.auth().signInWithEmailAndPassword("eduardo@ctrlalttec.hackclub.com", "123456");
    },
    update: (id, post)=>{
        db.collection("posts").doc(id).update(post).then(()=>{console.log("done")})
    }, 
    delete: (id, post)=>{
        db.collection("posts").doc(id).delete().then(()=>{console.log("done, deleted")})
    },
    create: (post)=>{
        db.collection("posts").add(post).then(()=>{console.log("done, created")})
    },
    allPosts: document.querySelector("#allPosts"),
    navBar: {
        logo: 'https://ctrl-alt-tec.hackclub.com/watermelon/logo.png',
        visible: true, 
    },
    sections: ['Blog', 'Retos', 'Talleres']
})
