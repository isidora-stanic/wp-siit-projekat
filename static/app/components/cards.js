Vue.component("cards", {
    data: function() {
        return {
            karte: []
        }
    },
    template: `
        <div>
            <div class="container">
                <div class="page-header">
                    <h1>Karte</h1>
                </div>

                <div class="dropdown float-right">
                    <button class="btn btn-lg btn-light dropdown-toggle" data-toggle="dropdown">
                        Sortiraj
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" @click="sortirajKarte('ime')">Ime</a>
                        <a class="dropdown-item" @click="sortirajKarte('cena')">Cena</a>
                        <a class="dropdown-item" @click="sortirajKarte('vreme')">Vreme</a>
                    </div>
                </div>

                <br /><br />
                <hr />

                <div class="jumbotron" style="padding-top: 15px; padding-bottom: 15px"
                 v-for="karta in karte"
                 :key="karta.manifestacijaID">
                    <h3>Kupac: {{karta.imeKupca}}</h3>
                    <hr />
                    <p>Datum: {{karta.datumManifestacije}}</p>
                    <p>Tip: {{karta.tip}}</p>
                    <p>Cena: {{karta.cena}}</p>
                    <p>Status: {{karta.status}}</p>
                    <hr />
                    <button type="button" class="btn btn-lg btn-primary" @click="posetiManifestaciju(karta.manifestacijaID)">
                        Detalji o manifestaciji
                    </button>
                </div>
            </div>
        </div>
    `,
    mounted() {
        axios
            .get("rest/karte")
            .then(response => {
                this.karte = response.data
            })
    },
    methods: {
        posetiManifestaciju(manifestacijaID) {
            this.$router.push('/manifestation/'+manifestacijaID);
        },
        sortirajKarte(kriterijum){
         this.karte.sort(function compareFn(a, b) {
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
//             if (a is less than b by some ordering criterion) {
//               return -1;
//             }
//             if (a is greater than b by the ordering criterion) {
//               return 1;
//             }
//              a must be equal to b
//             return 0;
           });
        }
    }
})