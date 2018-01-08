import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Login from './components/Login.vue';
import Index from './components/Index.vue';

var routes = [
    { path: '/login', component: Login },
    {
        path: '/',
        component: Index,
        beforeEnter: (to, from, next) => {
            if (localStorage.access_token && localStorage.access_token === '1234567890') {
                next();
            } else {
                next('login');
            }
        }
    },
];
Vue.use(VueRouter);

var router = new VueRouter({
    routes
});
window.onload = function () {
    var main = new Vue({
        el: '#app',
        router,
        render: h => h(App)
    });
}
