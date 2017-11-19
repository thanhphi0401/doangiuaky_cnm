/// <reference path="loginajax.js" />

var database = firebase.database();
function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
}
$('#loginbutton').click(function (e) {

    e.preventDefault();
    var email = $("input[name='Email']").val();
    var pass = $("input[name='Password']").val();
    var data = {
        email: email,
        password: pass
    };
    firebase.auth().signInWithEmailAndPassword(email, pass).then(e => {

        $.ajax({
            url: '/login/login',
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (response) {

                if (response.statusLogin == "true") {
                    window.location.href = "/";
                    //add logout button


                }
                else {
                    alert("Thông tin đăng nhập không đúng");

                }
                console.log(response.statusLogin);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }).catch(function (error) {
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
