Vue.component("homepage", {
    data: function() {
        return {
            manifestacije: null
        }
    },
    template: `
        <div>
            <div class="container">
                <div class="page-header">
                    <h1>TicketMix ticket service</h1>
                </div>
                                
                <div class="dropdown float-right">
                    <button class="btn btn-lg btn-light dropdown-toggle" data-toggle="dropdown">
                        Sortiraj
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#"">Ime</a>
                        <a class="dropdown-item" href="#">Cena</a>
                        <a class="dropdown-item" href="#">Vreme</a>
                        <a class="dropdown-item" href="#">Lokacija</a>
                    </div>
                </div>
                
                <br /><br />
                <hr />
                
                <div class="jumbotron" style="padding-top: 15px; padding-bottom: 15px"
                 v-for="manifestacija in manifestacije"
                 :key="manifestacija.ID">
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
    `,
    mounted() {
        axios
            .get("rest/manifestacije")
            .then(response => {
                this.manifestacije = response.data
            })
    },
    methods: {
        posetiManifestaciju(manifestacijaID) {
            alert(manifestacijaID)
        }
    }
})