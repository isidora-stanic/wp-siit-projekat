const homepage = {template: '<homepage></homepage>'}
const login = {template: '<login></login>'}
const register = {template: '<register></register>'}

const router = new VueRouter({
    mode: 'hash',
    routes: [
        /* Add your routes here */
        {path: '/', component: homepage},
        {path: '/login', component: login},
        {path: '/register', component: register}
    ]
})

const app = new Vue({
    router,
    el: '#app'
});