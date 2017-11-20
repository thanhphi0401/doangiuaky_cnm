//get element
var txtMail = document.getElementById('email');
var txtPass = document.getElementById('password');
var btnLogIn = document.getElementById('btn-login');
var btnSignUp = document.getElementById('btn-register');
var logOutBlock = document.getElementById('logOutBlock');
var btnLogOut = document.getElementById('btnLogOut');
var adminName = document.getElementById('adminName');
var btnCustomerList = document.getElementById('btnCustomerList');

//add btncustomerList Event
if (btnCustomerList) {
    btnCustomerList.addEventListener('click', e => {
        window.location.href = 'http://localhost:52398/History/Index';
    });
}

//add login event
if (btnLogIn) {
    btnLogIn.addEventListener('click', e => {
        //get email and password
        const email = txtMail.value;
        const pass = txtPass.value;
        var data = {
            email: email,
            password: pass
        }
        //sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.then(e => {
            logOutBlock.classList.remove("hide");
            adminName.innerHTML = e.email;
            //send data to home controller
            $.ajax({
                url: '/Login/Login',
                type: "POST",
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: function (response) {

                    if (response.statusLogin == "true") {
                        //window.location.href = "/";
                        window.location.href = 'http://localhost:52398/Home/Index';
                        //add logout button
                        console.log('sending data...')
                   
                    }
                    else {
                        alert("Thông tin đăng nhập không đúng");
                             auth.signOut();

                    }
                    console.log(response.statusLogin);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });
        promise.catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Mật khẩu không đúng!');
            } else {
                alert("Thông tin đăng nhập không đúng!");
                console.log(errorMessage);
            }
            
            console.log(error);
        });
    });
}

//add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser=> {
    
    if (firebaseUser) {
        console.log(firebaseUser.email);
       
        logOutBlock.classList.remove("hide");
        adminName.innerHTML = firebaseUser.email;
    }
    else {
        console.log('not logged in');
        logOutBlock.classList.add("hide");
    }
});