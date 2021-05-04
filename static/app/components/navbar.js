Vue.component("navbar", {
    data () {
        return {}
    },
    computed: {
        korisnik () {
            return localStorage.getItem('user')
        }
    },
    template: `
        <nav class="navbar navbar-expand-md navbar-light">
            <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <a class="navbar-brand" href="/">TicketMix</a>
                <ul class="navbar-nav mr-auto">
                    <li class="dropdown nav-item">
                        <a class="dropdown-toggle nav-link" data-toggle="dropdown" href="#">Kontekstni
                        <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a class="nav-link" href="#">Page 1-1</a></li>
                            <li><a class="nav-link" href="#">Page 1-2</a></li>
                            <li><a class="nav-link" href="#">Page 1-3</a></li>
                        </ul>
                      </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                </ul>
            </div>
            <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul class="navbar-nav ml-auto">
                    <li v-if="korisnik===null" class="nav-item">
                        <a class="nav-link font-weight-bold" href="#" @click.prevent="redirect('login')">Prijava</a>
                    </li>
                    <li v-if="korisnik===null" class="nav-item">
                        <a class="nav-link font-weight-bold" href="#" @click.prevent="redirect('register')">Registracija</a>
                    </li>
                    <li v-else class="nav-tem">
                        <a class="nav-link font-weight-bold" href="#">Odjava</a>
                    </li>
                </ul>
            </div>
        </nav>
    `,
    methods: {
        loggedIn() {
            return localStorage.getItem('user')
        },
        redirect(route) {
            this.$router.push('/'+route)
        }
    }
})