Vue.component("user-list", {
    data() {
        return {
            users: [],
            userSearchQuery: '',
            filter: {
                uloga: '',
                tip: ''
            }
        }
    },
    props: ['context'],
    computed: {
        filteredUsers() {
            if (this.userSearchQuery.trim()) {
                return this.users.filter(this.searchCriteria(this.userSearchQuery.trim()))
            }
            return this.users
        }
    },
    template: `
        <div class="container">
            <div class="page-header">
                <h1 v-if="context === 'ALL'">Pregled svih korisnika</h1>
                <h1 v-else="context === 'SUS'">Pregled sumnjivih korisnika</h1>
            </div>
            <div class="input-group">
                <div class="form-outline">
                    <input type="search" class="form-control" placeholder="Pretraga (ime)" v-model="userSearchQuery" />
                </div>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#filter">Filtriranje</button>

                <!--FILTER-->
                <div class="modal fade" id="filter" tabindex="-1" role="dialog" aria-labelledby="src-lbl" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="src-lbl">Filtriranje</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <label for="man-uloga" class="col-form-label">Uloga:</label>
                                        <select v-model="filter.uloga" id="man-uloga">
                                            <option value="KUPAC">Kupci</option>
                                            <option value="PRODAVAC">Prodavci</option>
                                            <option value="ADMIN">Administratori</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="man-tip" class="col-form-label">Tip:</label>
                                        <select :disabled="!filter.uloga.includes('KUPAC')" v-model="filter.tip" id="man-tip">
                                            <option value="BRONZE">Bronze</option>
                                            <option value="SILVER">Silver</option>
                                            <option value="GOLD">Gold</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light" data-dismiss="modal">Zatvori</button>
                                <button type="button" class="btn btn-primary" @click="filtrirajKorisnike()" data-dismiss="modal">Filtriraj</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="dropdown float-right">
                <button class="btn btn-lg btn-light dropdown-toggle" data-toggle="dropdown">
                    Sortiraj
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" v-on:click="sortirajKorisnike('ime1')">Ime Rastuće</a>
                    <a class="dropdown-item" v-on:click="sortirajKorisnike('ime2')">Ime Opadajuće</a>
                    <a class="dropdown-item" v-on:click="sortirajKorisnike('prezime1')">Prezime Rastuće</a>
                    <a class="dropdown-item" v-on:click="sortirajKorisnike('prezime2')">Prezime Opadajuće</a>
                    <a class="dropdown-item" v-on:click="sortirajKorisnike('username1')">Korisničko Ime Rastuće</a>
                    <a class="dropdown-item" v-on:click="sortirajKorisnike('username2')">Korisničko Ime Opadajuće</a>
                    <a class="dropdown-item" v-on:click="sortirajKorisnike('bodovi1')">Bodovi Rastuće</a>
                    <a class="dropdown-item" v-on:click="sortirajKorisnike('bodovi2')">Bodovi Opadajuće</a>
                </div>
            </div>

            <br /><br />
            <hr />

            <div class="jumbotron row" style="padding-top: 15px; padding-bottom: 15px"
             v-for="korisnik in filteredUsers"
             :key="korisnik.username">
                 <div class="col">
                    <h3>{{korisnik.username}}</h3>
                    <hr />
                    <h4>{{korisnik.ime}} {{korisnik.prezime}}</h4>
                    <p>Datum rodjenja: {{korisnik.datumRodjenja.substring(0, 11)}}</p>
                    <p>Pol: {{korisnik.pol}}</p>
                    <p>Uloga: {{korisnik.uloga}}</p>
                    <template v-if="korisnik.uloga === 'KUPAC'">
                        <hr />
                        <p>Broj sakupljenih poena: {{korisnik.sakupljenihPoena}}</p>
                        <p>Tip kupca: {{korisnik.tip}}</p>
                    </template>
                    <hr />
                    <template v-if="korisnik.uloga !== 'ADMIN'">
                        <button v-if="!korisnik.korisnikBlokiran" 
                            class="btn btn-primary" @click="block(korisnik.username)">Blokiraj</button>
                        <button v-else 
                            class="btn btn-primary" @click="unblock(korisnik.username)">Odblokiraj</button>   
                        <button class="btn btn-primary" @click="deleteUser(korisnik.username)">Obrisi</button>
                    </template>
                 </div>
            </div>
        </div>
    `,
    mounted() {
        let addedPath = this.context === 'ALL' ? 'all' : 'sus'
        let path = 'rest/korisnici/' + addedPath
        console.log(this.context)
        console.log(path)
        axios
            .get(path)
            .then(response => {
                this.users = response.data
            })
            .catch(error => {
                console.log(error.response.data)
            })
    },
    methods: {
        block(user) {
            axios
                .put('rest/user/block', {username: user, value: 'true'})
                .then(response => {
                    alert('Korisnik blokiran')
                    console.log(response)
                    this.$router.go()
                })
        },
        unblock(user) {
            axios
                .put('rest/user/block', {username: user, value: 'false'})
                .then(response => {
                    alert('Korisnik odblokiran')
                    console.log(response)
                    this.$router.go()
                })
        },
        deleteUser(user) {
            axios
                .delete('rest/user/delete/' + user)
                .then(response => {
                    alert('Korisnik obrisan')
                    console.log(response)
                    this.$router.go()
                })
        },
        searchCriteria(query) {
            return function (user) {
                let punoIme = user.ime + ' ' + user.prezime
                if (punoIme.toUpperCase().includes(query.toUpperCase()))
                    return true
                if (user.username.toUpperCase().includes(query.toUpperCase()))
                    return true
                return false
            }
        },
        filtrirajKorisnike() {
            console.log(this.users);
            if (this.filter.uloga.includes('KUPAC')){
                this.users = this.users.filter(x => x.uloga.includes(this.filter.uloga));
                this.users = this.users.filter(x => x.tip.includes(this.filter.tip));
            } else {
                this.filter.tip = '';
                this.users = this.users.filter(x => x.uloga.includes(this.filter.uloga));
            }
        },
        sortirajKorisnike(kriterijum) {
            this.users.sort(function compareFn(a, b) {
                if (kriterijum === "ime1"){
                    return a.ime.localeCompare(b.ime);
                } else if (kriterijum === "ime2"){
                    return a.ime.localeCompare(b.ime) * (-1);
                } else if (kriterijum === "prezime1"){
                    return a.prezime.localeCompare(b.prezime);
                } else if (kriterijum === "prezime2"){
                    return a.prezime.localeCompare(b.prezime) * (-1);
                } else if (kriterijum === "username1"){
                    return a.username.localeCompare(b.username);
                } else if (kriterijum === "username2"){
                    return a.username.localeCompare(b.username) * (-1);
                } else if (kriterijum === "bodovi1"){
                    if (!a.uloga.includes('KUPAC')){ a.sakupljenihPoena = 0; }
                    if (!b.uloga.includes('KUPAC')){ b.sakupljenihPoena = 0; }
                    if (a.sakupljenihPoena < b.sakupljenihPoena) return -1;
                    if (a.sakupljenihPoena > b.sakupljenihPoena) return 1;
                    return 0;
                } else if (kriterijum === "bodovi2"){
                    if (!a.uloga.includes('KUPAC')){ a.sakupljenihPoena = 0; }
                    if (!b.uloga.includes('KUPAC')){ b.sakupljenihPoena = 0; }
                    if (a.sakupljenihPoena < b.sakupljenihPoena) return 1;
                    if (a.sakupljenihPoena > b.sakupljenihPoena) return -1;
                    return 0;
                }
                return 0;
            });
        }
    },
})