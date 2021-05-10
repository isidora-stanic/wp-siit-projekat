Vue.component("manifestation", {
    data: function() {
        return {
            manifestacija: {
                ime: '',
                vremeOdrzavanja: '',
                tip: '',
                lokacija: { adresa: {ulicaIBroj: '', mesto: ''} },
                cenaKarte: 0
            },
//            uzetoKarata: null,
            komentari: [],
            kupovina: {
                tip: 'REGULAR',
                manifestacijaID: '',
                kolicina: 0,
                cena: 0,
                imeKupca: '',
                username: '',
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
                        <div class="row container">
                                            <!--<button class="btn btn-secondary col" @click="kupovina.kolicina--">-</button>
                                            <p class="col">{{kupovina.kolicina}}</p>
                                            <button class="btn btn-secondary col" @click="kupovina.kolicina++">+</button>-->
                            <div class="form-group ml-4">
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
                                <button class="btn btn-primary ml-4" style="width: 250%" @click="kupi()">Kupi</button>
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
        this.kupovina.username = this.korisnickoIme;
        this.kupovina.imeKupca = this.imeKorisnika;
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
            if (this.kupovina.kolicina < 1) {
                alert("Ne mozete kupiti 0 karata");
                return;
            }
            this.kupovina.cena = this.ukupnaCena;
            alert(JSON.stringify(this.kupovina));
            if (!this.korisnik) {
                alert('Niste ulogovani');
            }
            if (this.korisnickaUloga === "KUPAC") {
                axios
                    .post('rest/kupovina', this.kupovina)
                    .then(response => {
                        console.log(response.data)
                        this.manifestacija = response.data;
                        alert('Uspesna kupovina karte!');
                    })
                    .catch(response => {
                        console.log(response.data)
                        alert('Neuspesna kupovina karte, pokusajte ponovo!');
                    })
            }
        }
    },
    computed: {
        ukupnaCena() {
            let popust = 0;
            if (this.tipKorisnika === "SILVER") popust = 0.03;
            else if (this.tipKorisnika === "GOLD") popust = 0.05;
            if (this.kupovina.tip === "REGULAR") return (this.kupovina.kolicina * this.manifestacija.cenaKarte) * (1 - popust);
            if (this.kupovina.tip === "FAN_PIT") return (this.kupovina.kolicina * this.manifestacija.cenaKarte * 2) * (1 - popust);
            if (this.kupovina.tip === "VIP") return (this.kupovina.kolicina * this.manifestacija.cenaKarte * 4) * (1 - popust);
            return 0;
        },
        korisnik() {
            return JSON.parse(localStorage.getItem('user'));
        },
        korisnickaUloga() {
            return this.korisnik.uloga;
        },
        korisnickoIme() {
            return this.korisnik.username;
        },
        imeKorisnika() {
            return this.korisnik.ime + " " + this.korisnik.prezime;
        },
        tipKorisnika() {
            return this.korisnik.tip;
        }
    }
})