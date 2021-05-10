const homepage = {template: '<homepage></homepage>'}
const register = {template: '<register></register>'}
const login = {template: '<login></login>'}
const logout = {template: '<logout></logout>'}
const userDisplay = {template: '<user-display></user-display>'}
const manifestation = {template: '<manifestation></manifestation>'}
const manifestationForm = {template: '<manifestation-form></manifestation-form>'}
const manifestationEdit = {template: '<manifestation-edit></manifestation-edit>'}
const sellerManifestations = {template: '<seller-manifestations></seller-manifestations>'}
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
        {path: '/edit/manifestation/:id', component: manifestationEdit},
        {path: '/seller/manifestations', component: sellerManifestations},
        {path: '/cards', component: cards},
    ]
})

const app = new Vue({
    router,
    el: '#app'
});