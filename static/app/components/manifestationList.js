Vue.component("manifestation-list", {
    data: function() {
        return {
            manifestacije: []
        }
    },
    props: ['context'],
    template: `
        <div>
            <div class="container">
                <div class="page-header">
                    <h1>TicketMix ticket service</h1>
                </div>
                
                <div class="input-group">
                    <div class="form-outline">
                        <input type="search" id="man-ime" class="form-control" placeholder="Pretraga (ime)"/>
                    </div>
                    <button type="button" class="btn btn-primary">Traži</button>
                    <button type="button" class="btn btn-light" data-toggle="modal" data-target="#detailed-search">Detaljna pretraga</button>
                    
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
                                            <label for="man-tip" class="col-form-label">Tip:</label>
                                            <input type="text" class="form-control" id="man-tip">
                                        </div>
                                        <div class="form-group">
                                            <label for="man-mesto" class="col-form-label">Mesto:</label>
                                            <input type="text" class="form-control" id="man-mesto">
                                        </div>
                                        <div class="row justify-content-between" style="margin: 5px;">
                                            <div class="form-group col-xs-6">
                                                <label for="man-dat-od" class="col-form-label">Datum od:</label>
                                                <input type="date" class="form-control" id="man-dat-od">
                                            </div>
                                            <div class="form-group col-xs-6">
                                                <label for="man-dat-do" class="col-form-label">Datum do:</label>
                                                <input type="date" class="form-control" id="man-dat-do">
                                            </div>
                                        </div>
                                        <div class="row justify-content-between" style="margin: 5px;">
                                            <div class="form-group col-xs-6">
                                                <label for="man-cena-od" class="col-form-label">Cena od:</label>
                                                <input type="number" class="form-control" id="man-cena-od">
                                            </div>
                                            <div class="form-group col-xs-6">
                                                <label for="man-cena-do" class="col-form-label">Cena do:</label>
                                                <input type="number" class="form-control" id="man-cena-do">
                                            </div>
                                        </div>
                                        <div class="row justify-content-between" style="margin: 5px;">
                                            <div class="form-group col-xs-6">
                                                <label for="man-ocena-od" class="col-form-label">Ocena od:</label>
                                                <input type="number" class="form-control" id="man-ocena-od">
                                            </div>
                                            <div class="form-group col-xs-6">
                                                <label for="man-ocena-do" class="col-form-label">Ocena do:</label>
                                                <input type="number" class="form-control" id="man-ocena-do">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-light" data-dismiss="modal">Zatvori</button>
                                    <button type="button" class="btn btn-primary">Pretraži</button>
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
                        <a class="dropdown-item" @click="sortirajManifestacije('ime')">Ime</a>
                        <a class="dropdown-item" @click="sortirajManifestacije('cena')">Cena</a>
                        <a class="dropdown-item" @click="sortirajManifestacije('vreme')">Vreme</a>
                        <a class="dropdown-item" @click="sortirajManifestacije('lokacija')">Lokacija</a>
                    </div>
                </div>
                
                <br /><br />
                <hr />
                
                 <div class="jumbotron row" style="padding-top: 15px; padding-bottom: 15px"
                 v-for="manifestacija in manifestacije"
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
                        <hr />
                        <button type="button" class="btn btn-lg btn-primary" @click="posetiManifestaciju(manifestacija.ID)">
                            Detalji
                        </button>
                     </div>
                </div>
            </div>
        </div>
    `,
    mounted() {
        let sellerID = JSON.parse(localStorage.getItem('user')).username
        let path = this.context === 'ORGANIZER' ?
            'rest/manifestacije-prodavca/' + sellerID : 'rest/manifestacije'
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
                if (kriterijum === "ime"){
                    return a.ime.localeCompare(b.ime);
                } else if (kriterijum === "cena"){
                    if (a.cenaKarte < b.cenaKarte) return -1;
                    if (a.cenaKarte > b.cenaKarte) return 1;
                    return 0;
                } else if (kriterijum === "vreme"){
                    if (Date.parse(a.vremeOdrzavanja) < Date.parse(b.vremeOdrzavanja)) return -1;
                    if (Date.parse(a.vremeOdrzavanja) > Date.parse(b.vremeOdrzavanja)) return 1;
                    return 0;
                } else if (kriterijum === "lokacija"){
                    aAddress = a.lokacija.adresa.mesto + ' ' + a.lokacija.adresa.ulicaIBroj;
                    bAddress = b.lokacija.adresa.mesto + ' ' + b.lokacija.adresa.ulicaIBroj;
                    return aAddress.localeCompare(bAddress);
                }
                return 0;
            });
        }
    }
})