
//get element
var txtMail = document.getElementById('email');
var txtPass = document.getElementById('password');
var btnLogIn = document.getElementById('btn-login');
var btnSignUp = document.getElementById('btn-register');
var btnLogOut = document.getElementById('btnLogOut');


//add login event
btnLogIn.addEventListener('click', e => {
    //get email and password
    const email = txtMail.value;
    const pass = txtPass.value;
    //sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.then(e => {
        console.log(e.uid);
        console.log('Đăng nhập thành công');
        btnLogOut.classList.remove("hide");
        window.location.href = 'http://localhost:52398/Home/Index';
    });
    promise.catch(e => console.log(e.message));
})

//add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        console.log('logged in');
        btnLogOut.classList.remove("hide");
        // window.location.href = 'Index';
    }
    else {
        console.log('not logged in');
        btnLogOut.classList.add("hide");  
    }
});

