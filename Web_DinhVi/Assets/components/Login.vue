
<style>
    @import url(http://fonts.googleapis.com/css?family=Open+Sans:300,400,700);

    * {
        margin: 0;
        padding: 0;
    }

    body {
        background: #567;
        font-family: 'Open Sans',sans-serif;
    }

    .button {
        width: 100px;
        background: #3399cc;
        display: block;
        margin: 0 auto;
        margin-top: 1%;
        padding: 10px;
        text-align: center;
        text-decoration: none;
        color: #fff;
        cursor: pointer;
        transition: background .3s;
        -webkit-transition: background .3s;
    }

        .button:hover {
            background: #2288bb;
        }

    #login {
        width: 400px;
        margin: 0 auto;
        margin-top: 8px;
        margin-bottom: 2%;
        transition: opacity 1s;
        -webkit-transition: opacity 1s;
    }

    #triangle {
        width: 0;
        border-top: 12x solid transparent;
        border-right: 12px solid transparent;
        border-bottom: 12px solid #3399cc;
        border-left: 12px solid transparent;
        margin: 0 auto;
    }

    #login h1 {
        background: #3399cc;
        padding: 20px 0;
        font-size: 140%;
        font-weight: 300;
        text-align: center;
        color: #fff;
    }

    form {
        background: #f0f0f0;
        padding: 6% 4%;
    }

    input[type="email"], input[type="password"] {
        width: 100%;
        background: #fff;
        margin-bottom: 4%;
        border: 1px solid #ccc;
        padding: 4%;
        font-family: 'Open Sans',sans-serif;
        font-size: 95%;
        color: #555;
    }

    input[type="submit"] {
        width: 100%;
        background: #3399cc;
        border: 0;
        padding: 4%;
        font-family: 'Open Sans',sans-serif;
        font-size: 100%;
        color: #fff;
        cursor: pointer;
        transition: background .3s;
        -webkit-transition: background .3s;
    }

        input[type="submit"]:hover {
            background: #2288bb;
        }

</style>
<template>
    <div>
        <span href="#" class="button" id="toggle-login">Ứng dụng cho định vị viên</span>

        <div id="login">
            <div id="triangle"></div>
            <h1>Log in</h1>
            <form class="form-signin">
                <input type="email" v-model="email" required="" autofocus="" placeholder="Email" />
                <input type="password" v-model="password" required="" placeholder="Password" />
                <input type="submit" v-on:click="login" value="Log in" />
            </form>
        </div>

    </div>
</template>

<script type="text/javascript">

export default {

    name: 'Login',

    data () {
        return {
            title: 'Đăng nhập',
            email: '',
            password: ''
        }
    },

    methods: {
        login () {
            var self=this;
            firebase.auth().signInWithEmailAndPassword(self.email, self.password).then(e => {
                var data = {
                    email: self.email,
                    password: self.password
                };
                $.ajax({
                    url: '/login/login',
                    type: "POST",
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(data),
                    success: function (response) {

                        if (response.statusLogin == "true") {

                            //add logout button
                            localStorage.access_token = 'appdinhvi';
                            self.$router.push('/');

                        }
                        else {
                            alert("Bạn không có quyền!");

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

          
        }
    }
    }
</script>

<style lang="css" scoped>
</style>