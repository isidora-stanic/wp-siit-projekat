const homepage = {template: '<homepage></homepage>'}
const register = {template: '<register></register>'}
const registerSeller = {template: '<register-seller></register-seller>'}
const login = {template: '<login></login>'}
const logout = {template: '<logout></logout>'}
const userDisplay = {template: '<user-display></user-display>'}
const manifestation = {template: '<manifestation></manifestation>'}
const manifestationForm = {template: '<manifestation-form></manifestation-form>'}
const manifestationEdit = {template: '<manifestation-edit></manifestation-edit>'}
const sellerManifestations = {template: '<seller-manifestations></seller-manifestations>'}
const newManifestations = {template: '<new-manifestations></new-manifestations>'}
const declinedManifestations = {template: '<declined-manifestations></declined-manifestations>'}
const manifestationBuyers = {template: '<manifestation-buyers></manifestation-buyers>'}
const cards = {template: '<cards></cards>'}
const allUsersList = {template: '<all-users-list></all-users-list>'}
const susUsersList = {template: '<sus-users-list></sus-users-list>'}

const router = new VueRouter({
    mode: 'hash',
    routes: [
        /* Add your routes here */
        {path: '/', component: homepage},
        {path: '/login', component: login},
        {path: '/register', component: register},
        {path: '/register-seller', component: registerSeller},
        {path: '/logout', component: logout},
        {path: '/userView', component: userDisplay},
        {path: '/manifestation/:id', component: manifestation},
        {path: '/add/manifestation', component: manifestationForm},
        {path: '/edit/manifestation/:id', component: manifestationEdit},
        {path: '/buyers/manifestation/:id', component: manifestationBuyers},
        {path: '/seller/manifestations', component: sellerManifestations},
        {path: '/cards', component: cards},
        {path: '/users/all', component: allUsersList},
        {path: '/users/sus', component: susUsersList},
        {path: '/new/manifestations/', component: newManifestations},
        {path: '/declined/manifestations/', component: declinedManifestations},
    ]
})

const app = new Vue({
    router,
    el: '#app'
});