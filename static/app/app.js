const homepage = {template: '<homepage></homepage>'}
const login = {template: '<login></login>'}
const register = {template: '<register></register>'}
const manifestation = {template: '<manifestation></manifestation>'}

const router = new VueRouter({
    mode: 'hash',
    routes: [
        /* Add your routes here */
        {path: '/', component: homepage},
        {path: '/login', component: login},
        {path: '/register', component: register},
        {path: '/manifestation/:id', component: manifestation}
    ]
})

const app = new Vue({
    router,
    el: '#app'
});