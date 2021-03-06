Vue.component("cards", {
    data: function() {
        return {
            karte: [],
            backupKarte: [],
            manifestacije: [],
            pretrazeneKarte: [],
            listaKarata: [],
            filter: {
                tip: '',
                status: ''
            },
            pretraga: {
                manifestacija: '',
                datumOd: '', //Date.now(),
                datumDo: '', //Date.now(),
                cenaOd: 0,
                cenaDo: 0
            },
            otkazivanje: {
                id: '',
                username: ''
            }
        }
    },
    template: `
        <div>
            <div class="container">
                <div class="page-header">
                    <h1>Karte</h1>
                </div>

                <div class="input-group">
                    <div class="form-outline">
                        <input type="search" id="man-ime" class="form-control" placeholder="Pretraga (ime)" v-model="pretraga.manifestacija"/>
                    </div>
                    <button type="button" class="btn btn-primary" @click="pretraziKarte()">Traži</button>
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
                                            <label for="man-manifestacija" class="col-form-label">Naziv manifestacije:</label>
                                            <input type="text" class="form-control" id="man-manifestacija" v-model="pretraga.manifestacija">
                                        </div>
                                        <div class="row justify-content-between" style="margin: 5px;">
                                            <div class="form-group col-xs-6">
                                                <label for="man-dat-od" class="col-form-label">Datum od:</label>
                                                <input type="date" class="form-control" id="man-dat-od" v-model="pretraga.datumOd">
                                            </div>
                                            <div class="form-group col-xs-6">
                                                <label for="man-dat-do" class="col-form-label">Datum do:</label>
                                                <input type="date" class="form-control" id="man-dat-do" v-model="pretraga.datumDo">
                                            </div>
                                        </div>
                                        <div class="row justify-content-between" style="margin: 5px;">
                                            <div class="form-group col-xs-6">
                                                <label for="man-cena-od" class="col-form-label">Cena od:</label>
                                                <input type="number" class="form-control" min="0" id="man-cena-od" v-model="pretraga.cenaOd">
                                            </div>
                                            <div class="form-group col-xs-6">
                                                <label for="man-cena-do" class="col-form-label">Cena do:</label>
                                                <input type="number" class="form-control" min="0" id="man-cena-do" v-model="pretraga.cenaDo">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-light" data-dismiss="modal">Zatvori</button>
                                    <button type="button" class="btn btn-primary" @click="pretraziKarte()" data-dismiss="modal">Pretraži</button>
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
                                            <select v-model="filter.tip" id="man-tip">
                                                <!--<option>--- Izaberi tip ---</option>-->
                                                <option value="REGULAR">Regular</option>
                                                <option value="VIP">VIP</option>
                                                <option value="FAN_PIT">Fan pit</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="man-status" class="col-form-label">Status:</label>
                                            <select v-model="filter.status" id="man-status">
                                                <!--<option>--- Izaberi status ---</option>-->
                                                <option value="REZERVISANO">Rezervisano</option>
                                                <option value="OTKAZANO">Otkazano</option>
                                            </select>
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
                        <a class="dropdown-item" v-on:click="sortirajKarte('ime1')">Ime Rastuće</a>
                        <a class="dropdown-item" v-on:click="sortirajKarte('ime2')">Ime Opadajuće</a>
                        <a class="dropdown-item" v-on:click="sortirajKarte('cena1')">Cena Rastuće</a>
                        <a class="dropdown-item" v-on:click="sortirajKarte('cena2')">Cena Opadajuće</a>
                        <a class="dropdown-item" v-on:click="sortirajKarte('vreme1')">Vreme Rastuće</a>
                        <a class="dropdown-item" v-on:click="sortirajKarte('vreme2')">Vreme Opadajuće</a>
                    </div>
                </div>

                <br /><br />
                <hr />

                <div class="jumbotron" style="padding-top: 15px; padding-bottom: 15px"
                 v-for="karta in filtriraneKarte"
                 :key="karta.ID">
                    <h3>{{karta.manifestacija.ime}}</h3>
                    <h4>Kupac: {{karta.imeKupca}}</h4>
                    <hr />
                    <p>Datum: {{karta.datumManifestacije}}</p>
                    <p>Tip: {{karta.tip}}</p>
                    <p>Cena: {{karta.cena}}</p>
                    <p>Status: {{karta.status}}</p>
                    <hr />
                    <button type="button" class="btn btn-lg btn-primary" @click="posetiManifestaciju(karta.manifestacijaID)">
                        Detalji o manifestaciji
                    </button>
                    <button v-if="karta.status === 'REZERVISANO' && korisnickaUloga === 'KUPAC'" type="button" class="btn btn-lg btn-danger" @click="otkazi(karta)">Otkaži</button>
                </div>
            </div>
        </div>
    `,
    mounted() {
        if (this.korisnik) {
            if (this.korisnickaUloga === 'ADMIN') {
            //rest/manifestacije i rest/karte
                const manifestacijeReq = axios.get('rest/manifestacije')
                const karteReq = axios.get('rest/karte')
                axios.all([manifestacijeReq, karteReq])
                     .then(axios.spread((...responses) => {
                        this.manifestacije = responses[0].data
                        this.karte = responses[1].data
                        this.backupKarte = responses[1].data
                       //  for (let k in this.karte) {
                       //     for (let m of this.manifestacije) {
                       //         if (this.karte[k].manifestacijaID === m.ID){
                       //             k['manifestacija'] = m
                       //             break
                       //         }
                       //     }
                       // }
                        this.karte.forEach((karta, index) => {
                            for (let m of this.manifestacije) {
                                if (this.karte[index].manifestacijaID === m.ID){
                                    this.karte[index]['manifestacija'] = m
                                    this.backupKarte[index]['manifestacija'] = m
                                    break
                                }
                            }
                        })
                     }))
            } else if (this.korisnickaUloga === 'KUPAC') {
                const manifestacijeReq = axios.get('rest/manifestacije')
                const karteReq = axios.get('rest/karte/' + this.korisnickoIme)
                axios.all([manifestacijeReq, karteReq])
                     .then(axios.spread((...responses) => {
                         this.manifestacije = responses[0].data
                         this.karte = responses[1].data
                         this.backupKarte = responses[1].data
                       //  for (let k of this.karte) {
                       //     for (let m of this.manifestacije) {
                       //         if (k.manifestacijaID === m.ID){
                       //             k['manifestacija'] = m
                       //             break
                       //         }
                       //     }
                       // }
                         this.karte.forEach((karta, index) => {
                             for (let m of this.manifestacije) {
                                 if (this.karte[index].manifestacijaID === m.ID){
                                     this.karte[index]['manifestacija'] = m
                                     this.backupKarte[index]['manifestacija'] = m
                                     break
                                 }
                             }
                         })
                     }))
            } else if (this.korisnickaUloga === 'PRODAVAC') {
                const manifestacijeReq = axios.get('rest/manifestacije')
                const karteReq = axios.get('rest/karte-prodavca/' + this.korisnickoIme)
                axios.all([manifestacijeReq, karteReq])
                .then(axios.spread((...responses) => {
                    this.manifestacije = responses[0].data
                    this.karte = responses[1].data
                    this.backupKarte = responses[1].data
                //  for (let k of this.karte) {
                //     for (let m of this.manifestacije) {
                //         console.log(k.manifestacijaID)
                //         if (k.manifestacijaID == m.ID){
                //             console.log(k.manifestacijaID + '\n-------------')
                //             k['manifestacija'] = m
                //             break
                //         }
                //     }
                // }
                    this.karte.forEach((karta, index) => {
                        for (let m of this.manifestacije) {
                            if (this.karte[index].manifestacijaID === m.ID){
                                this.karte[index]['manifestacija'] = m
                                this.backupKarte[index]['manifestacija'] = m
                                break
                            }
                        }
                    })
                }))
            }


        }
    },
    methods: {
        posetiManifestaciju(manifestacijaID) {
            this.$router.push('/manifestation/'+manifestacijaID);
        },
        sortirajKarte(kriterijum){
            this.karte.sort(function compareFn(a, b) {
                if (kriterijum === "ime1"){
                    return a.manifestacija.ime.localeCompare(b.manifestacija.ime);
                } else if (kriterijum === "ime2"){
                    return a.manifestacija.ime.localeCompare(b.manifestacija.ime) * (-1);
                } else if (kriterijum === "cena1"){
                    if (a.cena < b.cena) return -1;
                    if (a.cena > b.cena) return 1;
                    return 0;
                } else if (kriterijum === "cena2"){
                    if (a.cena < b.cena) return 1;
                    if (a.cena > b.cena) return -1;
                    return 0;
                } else if (kriterijum === "vreme1"){
                    if (Date.parse(a.datumManifestacije) < Date.parse(b.datumManifestacije)) return -1;
                    if (Date.parse(a.datumManifestacije) > Date.parse(b.datumManifestacije)) return 1;
                    return 0;
                } else if (kriterijum === "vreme2"){
                    if (Date.parse(a.datumManifestacije) < Date.parse(b.datumManifestacije)) return 1;
                    if (Date.parse(a.datumManifestacije) > Date.parse(b.datumManifestacije)) return -1;
                    return 0;
                }
                return 0;
            });
        },
        pretraziKarte() {
            this.karte = this.backupKarte
            this.pretrazeneKarte = [];

            for (const k of this.karte) {
                let kartaDatum = Date.parse(k.datumManifestacije)
                let startDatum, endDatum
                if (this.pretraga.datumOd.trim() && this.pretraga.datumDo.trim()) {
                    startDatum = Date.parse(this.pretraga.datumOd)
                    endDatum = Date.parse(this.pretraga.datumDo)
                }
                //console.log(k.manifestacija.toUpperCase().includes(this.pretraga.manifestacija.toUpperCase()));
                if ((!this.pretraga.manifestacija.trim() || k.manifestacija.ime.toUpperCase().includes(this.pretraga.manifestacija.toUpperCase())) &&
                (this.pretraga.cenaDo === 0 || (k.cena >= this.pretraga.cenaOd && k.cena <= this.pretraga.cenaDo)) &&
                (!this.pretraga.datumOd || !this.pretraga.datumDo || (kartaDatum >= startDatum && kartaDatum <= endDatum)))
                    this.pretrazeneKarte.push(k);
            }
            //alert(JSON.stringify(this.pretrazeneKarte));
            this.karte = this.pretrazeneKarte;

            this.pretraga.datumOd = '' //Date.now();
            this.pretraga.datumDo = '' //Date.now();
            this.pretraga.cenaOd = 0
            this.pretraga.cenaDo = 0 //Number.MAX_SAFE_INTEGER;

        },
        filtrirajKarte() {
            this.karte = this.backupKarte
            this.karte = this.karte.filter(x => (
                (!x.tip.trim() || x.tip.toUpperCase().includes(this.filter.tip.toUpperCase())) &&
                (!x.status.trim() || x.status.toUpperCase().includes(this.filter.status.toUpperCase()))));
            //alert(JSON.stringify(this.listaKarata));
        },
        otkazi(karta) {
            this.otkazivanje.id = karta.ID;
            this.otkazivanje.username = this.korisnickoIme;
            var date = new Date();
            date.setDate(date.getDate() + 7);
            if (!(Date.parse(karta.datumManifestacije) > date)) {
                alert('Kasno za otkazivanje');
                return;
            }
            axios
                .post('rest/otkazivanje', this.otkazivanje)
                .then(response => {
                    console.log(response.data)
                    this.karte = response.data;
                    alert('Uspesno otkazivanje karte!');
                    this.$router.go()
                })
                .catch(response => {
                    console.log(response.data)
                    alert('Neuspesno otkazivanje karte, pokusajte ponovo!');
                })
        }
    },
    computed: {
        korisnik() {
            return JSON.parse(localStorage.getItem('user'));
        },
        korisnickaUloga() {
            return this.korisnik.uloga;
        },
        korisnickoIme() {
            return this.korisnik.username;
        },
        filtriraneKarte() {
            if (this.korisnik.uloga !== 'ADMIN')
                return this.karte.filter(karta => karta.status === 'REZERVISANO')
            else
                return this.karte
        }
    }
})