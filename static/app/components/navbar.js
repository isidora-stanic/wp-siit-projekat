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
                                <li><a class="nav-link" href="#" @click.prevent="redirect('users/all')">
                                    SVI KORISNICI
                                </a></li>
                                <li><a class="nav-link" href="#" @click.prevent="redirect('users/sus')">
                                    SUMNJIVI KORISNICI
                                </a></li>
                                <li><a class="nav-link" href="#" @click.prevent="redirect('new/manifestations')">
                                    PREGLED NOVIH MANIFESTACIJA
                                </a></li>
                                <li><a class="nav-link" href="#" @click.prevent="redirect('declined/manifestations')">
                                    PREGLED ODBIJENIH MANIFESTACIJA
                                </a></li>
                                <li><a class="nav-link" href="#" @click.prevent="redirect('cards')">PREGLED SVIH KARATA</a></li>
                                <li><a class="nav-link" href="#" @click.prevent="redirect('register-seller')">
                                    DODAJ NOVOG PRODAVCA
                                </a></li>
                            </template>
                            <template v-else-if="trenutniKorisnik.uloga=='KUPAC'">
                                <li><a class="nav-link" href="#" @click.prevent="redirect('')">PREGLED MANIFESTACIJA</a></li>
                                <li><a class="nav-link" href="#" @click.prevent="redirect('cards')">PREGLED KARATA</a></li>
                            </template>
                            <template v-else-if="trenutniKorisnik.uloga=='PRODAVAC'">
                                <li><a class="nav-link" href="#" @click.prevent="redirect('add/manifestation')">
                                    DODAJ MANIFESTACIJU
                                </a></li>
                                <li><a class="nav-link" href="#" @click.prevent="redirect('seller/manifestations')">
                                    PREGLEDAJ MANIFESTACIJE
                                </a></li>
                                <li><a class="nav-link" href="#" @click.prevent="redirect('cards')">
                                    PREGLEDAJ REZERVACIJE
                                </a></li>
                            </template>
                        </ul>
                      </li>
                    <li v-if="loggedIn" class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="redirect('userView')">PROFIL</a>
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
            this.$router.push('/') //Ne mora ali lepse izgleda kad se refresh-uje
        },
        write() {
            alert(this.loggedIn)
        }
    }
})