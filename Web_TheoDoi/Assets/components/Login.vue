<template>
    <div class="container">


        <div class="wrapper">

            <form class="form-signin">
                <h3 class="form-signin-heading">Welcome Back! Please Sign In</h3>
                <hr class="colorgraph"><br>
                <div class="form-group">
                    <input type="email" class="form-control" name="Email" id="txtUsername" v-model="username" placeholder="abc@gmail.com" required="" autofocus="" />
                </div>
               
                <input type="password" class="form-control" name="Password" id="txtPassword" v-model="password" placeholder="Password" required="" />

                <button class="btn btn-lg btn-primary btn-block" id="loginbutton" v-on:click="login" value="Login" type="button">Login</button>
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
            username: '',
            password: ''
        }
    },

    methods: {
        login () {
            if (this.username === 'ntphi' && this.password === '123') {
                localStorage.access_token = '1234567890';
                this.$router.push('/');
            } else {
                alert('login failed');
            }
        }
    }
    }
</script>

<style lang="css" scoped>
</style>