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
            komentarTekst: '',
            komentarOcena: '',
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
                    <h2 v-if="Date.parse(manifestacija.vremeOdrzavanja) < new Date">Ocena: {{ocena}}</h2>
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
                <button class="btn btn-lg btn-light d-flex float-right"
                    v-if="prodavacPostavio" @click="editRedirect">
                    Izmeni
                </button>
                <button class="btn btn-lg btn-primary d-flex float-right"
                    v-if="prodavacPostavio" @click="viewBuyers">
                    Kupci
                </button>
                <button class="btn btn-lg btn-light d-flex float-right"
                    v-if="korisnickaUloga === 'ADMIN'" @click="deleteManifestation">
                    Izbriši
                </button>
                <br /><br /><br />
                <hr />
                <div id="komentari row h-100 justify-content-center align-items-center">
                    <div v-if="korisnickaUloga === 'KUPAC'" class="comment-box">
                        <form>
                            <h4>Komentar:</h4>
                            <div class="form-row">
                                <div class="form-group col-md-9">
                                    <input type="text" class="form-control" placeholder="Unesite komentar..."
                                        v-model="komentarTekst">
                                </div>
                                <div class="form-group col-md-3">
                                    <select class="form-control" v-model="komentarOcena">
                                        <option selected disabled value="">Ocena</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                            </div>
                            <button class="btn btn-primary" @click="postComment">Objavi</button>
                        </form>
                        <hr />
                    </div>
                    <h4>Komentari: </h4>
                    <hr />
                    <div v-for="k in komentariZaPrikaz" :key="k.ID" style="margin: 15px;">
                        <h5>{{k.korisnik}}</h5>
                        <h6>Ocena: {{k.ocena}}</h6>
                        <h6>{{k.tekst}}</h6>
                        <template v-if="prodavacPostavio && !k.prihvacenoOdProdavca">
                            <button class="btn btn-primary btn-sm" @click="acceptComment(k.ID)">
                                Prihvati
                            </button>
                        </template>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted() {
        this.kupovina.manifestacijaID = this.$route.params.id;
        this.kupovina.username = this.korisnickoIme;
        this.kupovina.imeKupca = this.imeKorisnika;

        let manifestationPath = 'rest/manifestacija/' + this.$route.params.id
        let commentsPath = 'rest/comments/' + this.$route.params.id

        let manifestationRequest = axios.get(manifestationPath)
        let commentsRequest = axios.get(commentsPath)

        axios
            .all([manifestationRequest, commentsRequest])
            .then(axios.spread((...responses) => {
                this.manifestacija = responses[0].data
                this.komentari = responses[1].data
            }))
            .catch(errors => {
                console.log(errors)
                alert('Došlo je do greške')
            })
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
        },
        editRedirect() {
            let path = '/edit/manifestation/' + this.$route.params.id
            this.$router.push(path)
        },
        viewBuyers() {
            let path = '/buyers/manifestation/' + this.$route.params.id
            this.$router.push(path)
        },
        postComment() {
            let path = 'rest/comment/post'
            let komentar = {
                manifestacijaID: this.$route.params.id,
                username: this.korisnickoIme,
                tekst: this.komentarTekst,
                ocena: this.komentarOcena,
            }
            console.log(path)
            console.log(komentar)
            axios
                .post(path, komentar)
                .then(response => {
                    alert('Uspešno objavljen komentar')
                    console.log(response)
                })
                .catch(error => {
                    alert(error.response.data)
                    console.log(error)
                })
        },
        acceptComment(commentID) {
            let path = '/rest/comment/accept'
            axios
                .put(path, {commentID: commentID})
                .then(response => {
                    console.log(response)
                    this.$router.go()
                })
                .catch(error => {
                    alert(error.response.data)
                })
        },
        deleteManifestation() {
            let path = 'rest/delete/manifestacija/' + this.$route.params.id
            alert('Manifestacija će biti izbrisana')
            axios
                .delete(path)
                .then(response => {
                    alert('Manifestacija je izbrisana')
                    console.log(response)
                    this.$router.push('/')
                })
        }
    },
    computed: {
        ukupnaCena() {
            if (!this.korisnik || this.korisnickaUloga !== 'KUPAC')
                return 0

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
            if (!this.korisnik)
                return 'NONE'
            return this.korisnik.uloga;
        },
        korisnickoIme() {
            if (!this.korisnik)
                return 'NONE'
            return this.korisnik.username;
        },
        imeKorisnika() {
            if (!this.korisnik)
                return 'NONE'
            return this.korisnik.ime + " " + this.korisnik.prezime;
        },
        tipKorisnika() {
            if (!this.korisnik)
                return 'NONE'
            return this.korisnik.tip;
        },
        prodavacPostavio() {
            if (!this.korisnik)
                return false

            if (this.korisnickaUloga === 'PRODAVAC') {
                if (this.korisnik.manifestacijeIDs.includes(this.$route.params.id))
                    return true
            }
            return false
        },
        komentariZaPrikaz() {
            if (['NONE', 'KUPAC'].includes(this.korisnickaUloga))
                return this.komentari.filter(komentar => komentar.prihvacenoOdProdavca)
            return this.komentari
        },
        ocena() {
            let validniKomentari = this.komentari
                                    .filter(komentar => komentar.prihvacenoOdProdavca)
            let sumaOcena = 0
            let brojOcena = 0
            for (let ocenaKomentar of validniKomentari) {
                sumaOcena += ocenaKomentar.ocena
                brojOcena += 1
            }
            return brojOcena === 0 ? sumaOcena : sumaOcena / brojOcena
        }
    }
})