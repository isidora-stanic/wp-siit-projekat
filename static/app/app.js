const homepage = {template: '<homepage></homepage>'}
const register = {template: '<register></register>'}
const login = {template: '<login></login>'}
const logout = {template: '<logout></logout>'}
const userDisplay = {template: '<user-display></user-display>'}
const manifestation = {template: '<manifestation></manifestation>'}
const manifestationForm = {template: '<manifestation-form></manifestation-form>'}
const cards = {template: '<cards></cards>'}

const router = new VueRouter({
    mode: 'hash',
    routes: [
        /* Add your routes here */
        {path: '/', component: homepage},
        {path: '/login', component: login},
        {path: '/register', component: register},
        {path: '/logout', component: logout},
        {path: '/userView', component: userDisplay},
        {path: '/manifestation/:id', component: manifestation},
        {path: '/add/manifestation', component: manifestationForm},
        {path: '/cards', component: cards},
    ]
})

const app = new Vue({
    router,
    el: '#app'
});