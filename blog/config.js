// This document configures AltBlog to the specified settings. Check documentation for details

// Your web app's Firebase configuration
/*var firebaseConfig = {
    apiKey: "AIzaSyBaAIgZY3coG_Vlhv5UdZrqrlxTeLm_-RE",
    authDomain: "watermelon-974ca.firebaseapp.com",
    databaseURL: "https://watermelon-974ca.firebaseio.com",
    projectId: "watermelon-974ca",
    storageBucket: "watermelon-974ca.appspot.com",
    messagingSenderId: "458674442702",
    appId: "1:458674442702:web:42fa5b0b32ce9253381b9f",
    measurementId: "G-YMWDNF8GGQ"
};*/

var firebaseConfig = {
    apiKey: "AIzaSyBga60gYQLk27yHUeIPULRiZIXwojB5nzc",
    authDomain: "blog-e6b92.firebaseapp.com",
    databaseURL: "https://blog-e6b92.firebaseio.com",
    projectId: "blog-e6b92",
    storageBucket: "blog-e6b92.appspot.com",
    messagingSenderId: "55882587854",
    appId: "1:55882587854:web:f7bab3dffb99ff88087a9f",
    measurementId: "G-FT6FPR501W"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.firestore();
let storageRef = firebase.storage().ref();



let Blog = new AltBlog({
    data: async ()=>{
        let posts = await db.collection("posts").orderBy("time", "desc").get();
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
    fileUpload: async (stream, name, callback)=>{
        let promise = await storageRef.child(name).put(stream);
        let url = await promise.ref.getDownloadURL();
        return url
    },
    allPosts: document.querySelector("#allPosts"),
    navBar: {
        logo: 'https://ctrl-alt-tec.hackclub.com/watermelon/logo.png',
        visible: true, 
    },
    sections: ['Blog', 'Retos', 'Talleres']
})

firebase.auth().onAuthStateChanged(user=>{
    if(user){
        AltBlog.currentUser = user
    }
    console.log("user", user)
})