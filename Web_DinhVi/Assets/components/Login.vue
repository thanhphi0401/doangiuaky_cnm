<template>
    <div class="wrapper">
        <form action="" method="post" name="Login_Form" class="form-signin">
            <h3 class="form-signin-heading">Welcome Back! Please Sign In</h3>
            <hr class="colorgraph"><br>
            <input type="email" class="form-control" v-model="username" name="Email" placeholder="abc@gmail.com" required="" autofocus="" />
            <input type="password" class="form-control" name="Password" v-model="password" placeholder="Password" required="" />

            <button class="btn btn-lg btn-primary btn-block" v-on:click="login" id="loginbutton" value="Login" type="Submit">Login</button>
        </form>
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
            if (this.username === 'dinhvivien@gmail.com' && this.password === 'dinhvivien') {
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