const homepage = {template: '<homepage></homepage>'}
const register = {template: '<register></register>'}
const login = {template: '<login></login>'}
const logout = {template: '<logout></logout>'}

const router = new VueRouter({
    mode: 'hash',
    routes: [
        /* Add your routes here */
        {path: '/', component: homepage},
        {path: '/login', component: login},
        {path: '/register', component: register},
        {path: '/logout', component: logout},
    ]
})

const app = new Vue({
    router,
    el: '#app'
});