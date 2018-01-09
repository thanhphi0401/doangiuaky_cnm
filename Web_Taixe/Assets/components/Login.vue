<template>
    <div>
        <span href="#" class="button" id="toggle-login">Ứng dụng cho tài xế</span>

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
import {initialize} from '../scripts/main.js';

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
                            localStorage.access_token = 'appdriver';
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

            //if (this.username === 'taixe1@gmail.com' && this.password === 'Tietkhaiky2') {
            //    localStorage.access_token = '1234567890';
            //    this.$router.push('/');
            //} else {
            //    alert('login failed');
            //}
        }
    }
    }
</script>

<style lang="css" scoped>
</style>