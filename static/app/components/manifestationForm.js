Vue.component("manifestation-form", {
    data () {
        return {
            ime: '',
            tip: '',
            ukupnoMesta: 0,
            vremeOdrzavanja: '',
            cenaKarte: 0,
            slika: '',
            ulica: '',
            broj: '',
            mesto: '',
            zip: '',
            formError: false
        }
    },
    template: `
        <div class="containter h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <form>
                    <h1>Dodavanje nove manifestacije</h1>
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
                    <div class="form-group">
                        <label for="man-datum">Datum održavanja:</label>
                        <input type="date" v-model="vremeOdrzavanja" class="form-control" id="man-datum" placeholder="Datum održavanja....">
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
                    <button type="button" class="btn btn-primary" @click.prevent="addManifestation">Dodaj manifestaciju</button>
                </form>
            </div>
        </div>
    `,
    methods: {
        addManifestation() {
            if (!(this.ime && this.tip && this.vremeOdrzavanja && this.slika &&
                    this.ulica && this.broj && this.zip && this.mesto)) {
                this.formError = true
                return
            }
            let manifestacija = {
                ime: this.ime,
                tip: this.tip,
                ukupnoMesta: this.ukupnoMesta,
                vremeOdrzavanja: this.vremeOdrzavanja,
                cenaKarte: this.cenaKarte,
                ulicaIBroj: this.ulica + ' ' + this.broj,
                mesto: this.mesto,
                postanskiBroj: this.zip,
                slika: this.slika
            }
            alert('added')
            console.log(manifestacija)
        },
        selectImage(event) {
            this.slika = event.target.files[0].name
        }
    }
})