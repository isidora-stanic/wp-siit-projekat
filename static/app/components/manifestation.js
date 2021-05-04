Vue.component("manifestation", {
    data: function() {
        return {
            manifestacija: null,
            uzetoKarata: null,
            komentari: []
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
                        <h4><b>{{manifestacija.cenaKarte}}</b> RSD</h4>
                        <p>Preostalo karata: {{manifestacija.ukupnoMesta - manifestacija.prodatoKarata}}</p>
                        <div class="row container">
                            <!--<button class="btn btn-secondary col" @click="uzetoKarata--">-</button>
                            <p class="col">{{uzetoKarata}}</p>
                            <button class="btn btn-secondary col" @click="uzetoKarata++">+</button>-->
                            <input type="number" v-model="uzetoKarata" class="col" min="1" :max="manifestacija.ukupnoMesta - manifestacija.prodatoKarata">
                            <button class="btn btn-primary col ml-4" @click="kupi()">Kupi</button>
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
            alert(this.uzetoKarata);
        }
    }
})