Vue.component("manifestation-edit", {
    data () {
        return {
            ime: '',
            tip: '',
            ukupnoMesta: 0,
            datumMan: '',
            satnicaMan: '',
            cenaKarte: 0,
            slika: '',
            ulica: '',
            broj: '',
            mesto: '',
            zip: '',
            formError: false
        }
    },
    computed: {
        vremeOdrzavanja () {
            return this.datumMan + ' ' + this.satnicaMan
        }
    },
    template: `
        <div class="containter h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <form>
                    <h1>Izmena manifestacije</h1>
                    <div class="form-group">
                        <label for="man-ime">Naziv manifestacije:</label>
                        <input type="text" v-model="ime" class="form-control" id="man-ime" placeholder="Naziv manifestacije....">
                    </div>
                    <div class="form-group">
                        <label for="man-tip">Tip manifestacije:</label>
                        <input type="text" v-model="tip" class="form-control" id="man-tip" placeholder="Tip manifestacije....">
                    </div>
                    <div class="form-group">
                        <label for="man-kapacitet">Broj mesta:</label>
                        <input type="number" min="0" v-model="ukupnoMesta" class="form-control" id="man-kapacitet" placeholder="Broj mesta....">
                    </div>
                    <div class="form-group">
                        <label for="man-cena">Cena karte:</label>
                        <input type="number" min="0" v-model="cenaKarte" class="form-control" id="man-cena" placeholder="Cena karte....">
                    </div>
                    <hr />
                    <div class="form-row">
                        <div class="form-group col-md-8">
                            <label for="man-datum">Datum održavanja:</label>
                            <input type="date" v-model="datumMan" class="form-control" id="man-datum">
                        </div>
                        <div class="form-group col-md-4">
                            <label for="man-vreme">Vreme odrzavanja:</label>
                            <input type="time" v-model="satnicaMan" class="form-control" id="man-vreme">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-8">
                            <label for="man-ulica">Ulica:</label>
                            <input type="text" v-model="ulica" class="form-control" id="man-ulica" placeholder="Ulica....">
                        </div>
                        <div class="form-group col-md-4">
                            <label for="man-broj">Broj:</label>
                            <input type="text" v-model="broj" class="form-control" id="man-broj" placeholder="Broj....">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="man-mesto">Mesto:</label>
                            <input type="text" v-model="mesto" class="form-control" id="man-mesto" placeholder="Mesto....">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="man-zip">ZIP:</label>
                            <input type="text" v-model="zip" class="form-control" id="man-zip" placeholder="ZIP....">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="man-img">Poster:</label>
                        <input type="file" class="form-control-file" id="man-img" @change="selectImage" accept="image/png, image/jpeg">
                    </div>
                    <transition name="fade">
                      <div v-if="formError">
                        <small style="color: red;">Popunite sva polja!</small>
                        <hr />
                      </div>
                    </transition>
                    <button type="button" class="btn btn-primary" @click.prevent="editManifestation">Izmeni manifestaciju</button>
                </form>
            </div>
        </div>
    `,
    mounted () {
        let path = 'rest/manifestacija/' + this.$route.params.id
        axios
            .get(path)
            .then(response => {
                let manifestacija = response.data
                console.log(manifestacija)
                this.ime = manifestacija.ime
                this.tip = manifestacija.tip
                this.ukupnoMesta = manifestacija.ukupnoMesta
                this.cenaKarte = manifestacija.cenaKarte

                let ulicBrojArray = manifestacija.lokacija.adresa.ulicaIBroj.split(' ')
                this.ulica = ulicBrojArray.slice(0, ulicBrojArray.length-1).join(' ')
                this.broj = ulicBrojArray[ulicBrojArray.length-1]
                this.mesto = manifestacija.lokacija.adresa.mesto
                this.zip = manifestacija.lokacija.adresa.postanskiBroj

                let datumTemp = new Date(Date.parse(manifestacija.vremeOdrzavanja))
                let datumVremeString = datumTemp.toISOString()
                this.datumMan = datumVremeString.substring(0, 10)
                this.satnicaMan = datumVremeString.substring(11, 16)
            })
    },
    methods: {
        editManifestation() {
            if (!(this.ime && this.tip && this.datumMan && this.satnicaMan
                && this.slika && this.ulica && this.broj && this.zip && this.mesto)) {
                this.formError = true
                return
            }
            let manifestacija = {
                id: this.$route.params.id,
                ime: this.ime,
                tip: this.tip,
                ukupnoMesta: this.ukupnoMesta.toString(),
                vremeOdrzavanja: this.vremeOdrzavanja,
                cenaKarte: this.cenaKarte.toString(),
                ulicaIBroj: this.ulica + ' ' + this.broj,
                mesto: this.mesto,
                postanskiBroj: this.zip,
                slika: this.slika,
                prodavacID: JSON.parse(localStorage.getItem('user')).username
            }
            console.log(manifestacija)
            //TODO: Dodati axios PUT poziv
            let path = 'rest/edit/manifestacija'
            axios
                .put(path, manifestacija)
                .then(response => {
                    alert('Uspešno izmenjena manifestacija')
                    console.log(response)
                    this.$router.push('/')
                })
                .catch(response => {
                    alert('Ta lokacija je zauzeta u datom terminu')
                    console.log(response)
                })
        },
        selectImage(event) {
            this.slika = event.target.files[0].name
        }
    }
})