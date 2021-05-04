Vue.component("logout", {
    data() {
        return { }
    },
    template: `
        <p>Odjavljujemo vas...</p>
    `,
    mounted() {
        localStorage.removeItem('user')
        this.$router.push('/')
        window.location.reload()
    }
})