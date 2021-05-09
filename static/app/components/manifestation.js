Vue.component("manifestation", {
    data: function() {
        return {
            manifestacija: null,
//            uzetoKarata: null,
            komentari: [],
            kupovina: {
                tip: 'REGULAR',
                manifestacijaID: '',
                kolicina: 0,
                cena: 0
            }
        }
    },
    template: `
        <div>
            <div class="container">
                <div class="page-header">
                    <h1>{{manifestacija.ime}}</h1>
                    <h2>TODO: *****</h2>
                </div>
                <div class="row">
                    <img class="col-lg-4" v-bind:src="'../images/' + manifestacija.slika">
                    <div class="jumbotron col">
                        <h5>{{manifestacija.vremeOdrzavanja}} | {{manifestacija.tip}}</h5>
                        <h6>{{manifestacija.lokacija.adresa.ulicaIBroj}}, {{manifestacija.lokacija.adresa.mesto}}</h6>
                        <h4>Regular: <b>{{manifestacija.cenaKarte}}</b> RSD</h4>
                        <h5>Fan pit: <b>{{manifestacija.cenaKarte * 2}}</b> RSD</h5>
                        <h6>VIP: <b>{{manifestacija.cenaKarte * 4}}</b> RSD</h6>
                        <p>Preostalo karata: {{manifestacija.ukupnoMesta - manifestacija.prodatoKarata}}</p>
                        <hr/>
                        <div class="row container ml-4">
                                            <!--<button class="btn btn-secondary col" @click="kupovina.kolicina--">-</button>
                                            <p class="col">{{uzetoKarata}}</p>
                                            <button class="btn btn-secondary col" @click="kupovina.kolicina++">+</button>-->
                            <div class="form-group">
                                <label for="koliko" class="col-form-label">Količina:</label>
                                <input id="koliko" class="" type="number" v-model="kupovina.kolicina" min="0" :max="manifestacija.ukupnoMesta - manifestacija.prodatoKarata">
                            </div>

                            <div class="form-group ml-4">
                                <label for="tip" class="col-form-label">Tip:</label>
                                <select class="" v-model="kupovina.tip" id="tip">
                                    <option value="REGULAR">Regular</option>
                                    <option value="FAN_PIT">Fan pit</option>
                                    <option value="VIP">VIP</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <button class="btn btn-primary ml-4" style="width: 400%" @click="kupi()">Kupi</button>
                            </div>
                        </div>
                        <hr/>
                        <div>
                            <h3>Ukupno: {{ukupnaCena}}</h3>
                        </div>

                    </div>
                </div>
                <div id="komentari">
                    <div class="jumbotron" v-for="k in komentari" :key="k">
                        </hr>
                        <h5>{{k.korisnik}} {{k.ocena}}</h5>
                        <h6>{{k.tekst}}</h6>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted() {
        this.kupovina.manifestacijaID = this.$route.params.id;
        axios
            .get("rest/manifestacija/" + this.$route.params.id)
            .then(response => {
                if (response.data)
                    this.manifestacija = response.data
                else
                    alert('Ne postoji tražena manifestacija');
            });
    },
    methods: {
        kupi() {
            this.kupovina.cena = this.ukupnaCena;
            alert(JSON.stringify(this.kupovina));
        }
    },
    computed: {
        ukupnaCena() {
            if (this.kupovina.tip === "REGULAR") return this.kupovina.kolicina * this.manifestacija.cenaKarte;
            if (this.kupovina.tip === "FAN_PIT") return this.kupovina.kolicina * this.manifestacija.cenaKarte * 2;
            if (this.kupovina.tip === "VIP") return this.kupovina.kolicina * this.manifestacija.cenaKarte * 4;
            return 0;
        }
    }
})