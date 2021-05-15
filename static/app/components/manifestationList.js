Vue.component("manifestation-list", {
    data: function() {
        return {
            manifestacije: [],
            filter: {
                tip: '',
                nerasprodateKarte: false
            },
            pretraga: {
                ime: '',
                mesto: '',
                datumOd: Date.now(),
                datumDo: Date.now(),
                cenaOd: 0,
                cenaDo: Number.MAX_SAFE_INTEGER
            },
            komentari: []
        }
    },
    props: ['context'],
    computed: {
        korisnickaUloga(){
            let korisnikJSON = localStorage.getItem('user')
            if (!korisnikJSON)
                return 'NONE'
            return JSON.parse(korisnikJSON).uloga
        },
        manifestacijeZaPrikaz() {
            if (this.korisnickaUloga === 'KUPAC')
                return this.manifestacije.filter(manifestacija => manifestacija.status !== 'ODBIJENA')
            if (this.context === 'NEW')
                return this.manifestacije.filter(manifestacija => manifestacija.status === 'NEAKTIVNA')
            if (this.context === 'DECLINED')
                return this.manifestacije.filter(manifestacija => manifestacija.status === 'ODBIJENA')
            return this.manifestacije
        }
    },
    template: `
        <div>
            <div class="container">
                <div class="page-header">
                    <h1>TicketMix ticket service</h1>
                </div>
                
                <div class="input-group">
                    <div class="form-outline">
                        <input type="search" id="man-ime-spolja" class="form-control" placeholder="Pretraga (ime)" v-model="pretraga.ime"/>
                    </div>
                    <button type="button" class="btn btn-primary" @click="pretraziManifestacije()">Traži</button>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detailed-search">Detaljna pretraga</button>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#filter">Filtriranje</button>

                    <!--DETALJNA PRETRAGA-->
                    <div class="modal fade" id="detailed-search" tabindex="-1" role="dialog" aria-labelledby="src-lbl" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="src-lbl">Detaljna pretraga</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="form-group">
                                            <label for="man-ime" class="col-form-label">Ime:</label>
                                            <input v-model="pretraga.ime" type="text" class="form-control" id="man-ime">
                                        </div>
                                        <div class="form-group">
                                            <label for="man-tip" class="col-form-label">Tip:</label>
                                            <input v-model="pretraga.tip" type="text" class="form-control" id="man-tip">
                                        </div>
                                        <div class="form-group">
                                            <label for="man-mesto" class="col-form-label">Mesto:</label>
                                            <input v-model="pretraga.mesto" type="text" class="form-control" id="man-mesto">
                                        </div>
                                        <div class="row justify-content-between" style="margin: 5px;">
                                            <div class="form-group col-xs-6">
                                                <label for="man-dat-od" class="col-form-label">Datum od:</label>
                                                <input  v-model="pretraga.datumOd"type="date" class="form-control" id="man-dat-od">
                                            </div>
                                            <div class="form-group col-xs-6">
                                                <label for="man-dat-do" class="col-form-label">Datum do:</label>
                                                <input v-model="pretraga.datumDo" type="date" class="form-control" id="man-dat-do">
                                            </div>
                                        </div>
                                        <div class="row justify-content-between" style="margin: 5px;">
                                            <div class="form-group col-xs-6">
                                                <label for="man-cena-od" class="col-form-label">Cena od:</label>
                                                <input v-model="pretraga.cenaOd" min="0" type="number" class="form-control" id="man-cena-od">
                                            </div>
                                            <div class="form-group col-xs-6">
                                                <label for="man-cena-do" class="col-form-label">Cena do:</label>
                                                <input v-model="pretraga.cenaDo" min="0" type="number" class="form-control" id="man-cena-do">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-light" data-dismiss="modal">Zatvori</button>
                                    <button type="button" class="btn btn-primary" @click="pretraziManifestacije()">Pretraži</button>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                            <label for="man-tip" class="col-form-label">Tip:</label>
                                            <input id="man-tip" v-model="filter.tip" type="text" name="format" value=""/>
                                        </div>
                                        <div class="form-check">
                                          <input v-model="filter.nerasprodateKarte" class="form-check-input" type="checkbox" value="" id="man-nerasprodate">
                                          <label class="form-check-label" for="man-nerasprodate">
                                            Nerasprodate
                                          </label>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-light" data-dismiss="modal">Zatvori</button>
                                    <button type="button" class="btn btn-primary" @click="filtrirajKarte()" data-dismiss="modal">Filtriraj</button>
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
                        <a class="dropdown-item" @click="sortirajManifestacije('ime1')">Ime Rastuće</a>
                        <a class="dropdown-item" @click="sortirajManifestacije('ime2')">Ime Opadajuće</a>
                        <a class="dropdown-item" @click="sortirajManifestacije('cena1')">Cena Rastuće</a>
                        <a class="dropdown-item" @click="sortirajManifestacije('cena2')">Cena Opadajuće</a>
                        <a class="dropdown-item" @click="sortirajManifestacije('vreme1')">Vreme Rastuće</a>
                        <a class="dropdown-item" @click="sortirajManifestacije('vreme2')">Vreme Opadajuće</a>
                        <a class="dropdown-item" @click="sortirajManifestacije('lokacija1')">Lokacija Rastuće</a>
                        <a class="dropdown-item" @click="sortirajManifestacije('lokacija2')">Lokacija Opadajuće</a>
                    </div>
                </div>
                
                <br /><br />
                <hr />
                
                 <div class="jumbotron row" style="padding-top: 15px; padding-bottom: 15px"
                 v-for="manifestacija in manifestacijeZaPrikaz"
                 :key="manifestacija.ID">
                     <div class="col" style="overflow: hidden; height: 250px;">
                         <img class="" v-bind:src="'../images/' + manifestacija.slika">
                     </div>
                     <div class="col">
                        <h3>{{manifestacija.ime}}</h3>
                        <hr />
                        <p>{{manifestacija.vremeOdrzavanja}} | {{manifestacija.tip}}</p>
                        <p>Cena karte: {{manifestacija.cenaKarte}}</p>
                        <p>{{manifestacija.lokacija.adresa.ulicaIBroj}}, {{manifestacija.lokacija.adresa.mesto}}</p>
                        <p>Status: {{manifestacija.status}}</p>
                        <hr />
                        <button type="button" class="btn btn-lg btn-primary" @click="posetiManifestaciju(manifestacija.ID)">
                            Detalji
                        </button>
                        <template v-if="context === 'NEW'">
                             <button class="btn btn-secondary d-flex float-right" @click="odbij(manifestacija.ID)">
                                Odbij
                            </button>
                             <button class="btn btn-light d-flex float-right" @click="prihvati(manifestacija.ID)">
                                Prihvati
                             </button>
                        </template>
                        <template v-else-if="context === 'DECLINED'"> 
                             <button class="btn btn-light d-flex float-right" @click="prihvati(manifestacija.ID)">
                                Prihvati
                             </button>
                        </template>
                     </div>
                </div>
            </div>
        </div>
    `,
    mounted() {
        let path = 'rest/manifestacije'
        if (this.context === 'ORGANIZER') {
            let sellerID = JSON.parse(localStorage.getItem('user')).username
            path = 'rest/manifestacije-prodavca/' + sellerID
        }
        axios
            .get(path)
            .then(response => {
                this.manifestacije = response.data
            })

    },
    methods: {
        posetiManifestaciju(manifestacijaID) {
            this.$router.push('/manifestation/'+manifestacijaID);
        },
        sortirajManifestacije(kriterijum){
            this.manifestacije.sort(function compareFn(a, b) {
                if (kriterijum === "ime1") {
                    return a.ime.localeCompare(b.ime);
                } else if (kriterijum === "ime2") {
                    return a.ime.localeCompare(b.ime) * (-1);
                } else if (kriterijum === "cena1") {
                    if (a.cenaKarte < b.cenaKarte) return -1;
                    if (a.cenaKarte > b.cenaKarte) return 1;
                    return 0;
                } else if (kriterijum === "cena2") {
                    if (a.cenaKarte < b.cenaKarte) return 1;
                    if (a.cenaKarte > b.cenaKarte) return -1;
                    return 0;
                } else if (kriterijum === "vreme1") {
                    if (Date.parse(a.vremeOdrzavanja) < Date.parse(b.vremeOdrzavanja)) return -1;
                    if (Date.parse(a.vremeOdrzavanja) > Date.parse(b.vremeOdrzavanja)) return 1;
                    return 0;
                } else if (kriterijum === "vreme2") {
                    if (Date.parse(a.vremeOdrzavanja) < Date.parse(b.vremeOdrzavanja)) return 1;
                    if (Date.parse(a.vremeOdrzavanja) > Date.parse(b.vremeOdrzavanja)) return -1;
                    return 0;
                } else if (kriterijum === "lokacija1"){
                    let aAddress = a.lokacija.adresa.mesto + ' ' + a.lokacija.adresa.ulicaIBroj;
                    let bAddress = b.lokacija.adresa.mesto + ' ' + b.lokacija.adresa.ulicaIBroj;
                    return aAddress.localeCompare(bAddress);
                } else if (kriterijum === "lokacija2") {
                    let aAddress = a.lokacija.adresa.mesto + ' ' + a.lokacija.adresa.ulicaIBroj;
                    let bAddress = b.lokacija.adresa.mesto + ' ' + b.lokacija.adresa.ulicaIBroj;
                    return aAddress.localeCompare(bAddress) * (-1);
                }
                return 0;
            });
        },
        pretraziManifestacije() {
            this.pretrazeneManifestacije = [];
            //TODO: DODATI OSTALE PROVERE........

            for (const k of this.manifestacije) {
                console.log(k.ime.toUpperCase().includes(this.pretraga.ime.toUpperCase()));

                if ((k.ime.toUpperCase().includes(this.pretraga.ime.toUpperCase())) &&
                ((k.lokacija.adresa.mesto.toUpperCase().includes(this.pretraga.mesto.toUpperCase())) ||
                (k.lokacija.adresa.ulicaIBroj.toUpperCase().includes(this.pretraga.mesto.toUpperCase()))) &&
                (k.cenaKarte >= this.pretraga.cenaOd && k.cenaKarte <= this.pretraga.cenaDo) &&
                (k.vremeOdrzavanja >= this.pretraga.datumOd && k.vremeOdrzavanja <= this.pretraga.datumDo))
                    this.pretrazeneManifestacije.push(k);
            }
            alert(JSON.stringify(this.pretrazeneManifestacije));
            this.manifestacije = this.pretrazeneManifestacije;

            this.pretraga.mesto = '';
            this.pretraga.datumOd = Date.now();
            this.pretraga.datumDo = Date.now();
            this.pretraga.cenaOd = 0;
            this.pretraga.cenaDo = Number.MAX_SAFE_INTEGER;

        },
        filtrirajKarte() {
            this.manifestacije = this.manifestacije.filter(x => (x.tip.toLowerCase().includes(this.filter.tip.toLowerCase())));
            if (this.filter.nerasprodateKarte)
                this.manifestacije = this.manifestacije.filter(x => (x.ukupnoMesta - x.prodatoKarata > 0));
        },
        prihvati(manifestacijaID) {
            axios
                .put('rest/prihvati/manifestacija', {manifestacijaID: manifestacijaID})
                .then(response => {
                    console.log(response)
                    alert('Manifestacija prihvaćena')
                    this.$router.go()
                })
        },
        odbij(manifestacijaID) {
            axios
                .put('rest/odbij/manifestacija', {manifestacijaID: manifestacijaID})
                .then(response => {
                    console.log(response)
                    alert('Manifestacija odbijena')
                    this.$router.go()
                })
        }
    }
})