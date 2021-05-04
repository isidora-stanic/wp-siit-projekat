const homepage = {template: '<homepage></homepage>'}
const login = {template: '<login></login>'}

const router = new VueRouter({
    mode: 'hash',
    routes: [
        /* Add your routes here */
        {path: '/', component: homepage},
        {path: '/login', component: login}
    ]
})

const app = new Vue({
    router,
    el: '#app'
});