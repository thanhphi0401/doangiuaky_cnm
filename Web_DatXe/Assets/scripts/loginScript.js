//var database = firebase.database();
//const auth = firebase.auth();

//auth.createUserWithEmailAndPassword(email, pass);

//get element
var txtMail = document.getElementById('email');
var txtPass = document.getElementById('password');
var btnLogIn = document.getElementById('btn-login');
var btnSignUp = document.getElementById('btn-register');

//add login event
btnLogIn.addEventListener('click', e => {
    //get email and password
    const email = txtMail.value;
    const pass = txtPass.value;

    //sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
    window.location.href = 'Index';
})

//add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
       
    }
    else {
        console.log('not logged in');
    }
});

