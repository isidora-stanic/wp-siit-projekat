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
                
                <div class="jumbotron" style="padding-top: 15px; padding-bottom: 15px"
                 v-for="manifestacija in manifestacije">
                    <h3>{{manifestacija.ime}}</h3>
                    <hr />
                    <p>{{manifestacija.vremeOdrzavanja}} | {{manifestacija.tip}}</p>
                    <p>Cena karte: {{manifestacija.cenaKarte}}</p>
                    <p>{{manifestacija.lokacija.adresa.ulicaIBroj}}, {{manifestacija.lokacija.adresa.mesto}}</p>
                    <hr />
                    <button type="button" class="btn btn-lg btn-primary">Detalji</button>
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
    }
})