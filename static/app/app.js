const homepage = {template: '<homepage></homepage>'}

const router = new VueRouter({
    mode: 'hash',
    routes: [
        /* Add your routes here */
        {path: '/', component: homepage}
    ]
})

const app = new Vue({
    router,
    el: '#app'
});