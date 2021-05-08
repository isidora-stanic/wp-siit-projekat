Vue.component("navbar", {
    data () {
        return {
            korisnik: null,
            loggedIn: false
        }
    },
    computed: {
        trenutniKorisnik () {
            return JSON.parse(localStorage.getItem('user'))
        }
    },
    watch: {
      trenutniKorisnik(val) {
          this.loggedIn = val !== null;
      }
    },
    mounted() {
        this.korisnik = JSON.parse(localStorage.getItem('user'))
        if (this.korisnik !== null)
            this.loggedIn = true
    },
    template: `
        <nav class="navbar navbar-expand-md navbar-light">
            <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <a class="navbar-brand" href="/">TicketMix</a>
                <ul class="navbar-nav mr-auto">
                    <li class="dropdown nav-item" v-if="loggedIn">
                        <a class="dropdown-toggle nav-link" data-toggle="dropdown" href="#">{{trenutniKorisnik.uloga}}
                        <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <template v-if="trenutniKorisnik.uloga=='ADMIN'">
                                <li><a class="nav-link" href="#">ADMIN 1</a></li>
                                <li><a class="nav-link" href="#">ADMIN 2</a></li>
                                <li><a class="nav-link" href="#">ADMIN 3</a></li>
                            </template>
                            <template v-else-if="trenutniKorisnik.uloga=='KUPAC'">
                                <li><a class="nav-link" href="#">KUPAC 1</a></li>
                                <li><a class="nav-link" href="#">KUPAC 2</a></li>
                                <li><a class="nav-link" href="#">KUPAC 3</a></li>
                            </template>
                        </ul>
                      </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="write">Link</a>
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
                    <li v-if="!loggedIn" class="nav-item">
                        <a class="nav-link font-weight-bold" href="#" @click.prevent="redirect('login')">Prijava</a>
                    </li>
                    <li v-if="!loggedIn" class="nav-item">
                        <a class="nav-link font-weight-bold" href="#" @click.prevent="redirect('register')">Registracija</a>
                    </li>
                    <li v-if="loggedIn" class="nav-item">
                        <a class="nav-link font-weight-bold" href="#" @click.prevent="logOut">Odjava</a>
                    </li>
                </ul>
            </div>
        </nav>
    `,
    methods: {
        redirect(route) {
            this.$router.push('/'+route)
        },
        logOut() {
            localStorage.removeItem('user')
            this.loggedIn = false
            this.$router.go() //Ne mora ali lepse izgleda kad se refresh-uje
        },
        write() {
            alert(this.loggedIn)
        }
    }
})