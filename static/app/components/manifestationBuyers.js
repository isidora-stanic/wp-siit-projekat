Vue.component("manifestation-buyers", {
    data() {
        return {
            userSearchQuery: '',
            kupci: []
        }
    },
    computed: {
      filtriraniKupci() {
          if (this.userSearchQuery.trim()) {
              return this.kupci.filter(this.searchCriteria(this.userSearchQuery.trim()))
          }
          return this.kupci
      }
    },
    template: `
        <div class="container">
            <div class="page-header">
                <h1>Pregled kupaca karata za manifestaciju</h1>
            </div>
            <div class="input-group">
                <div class="form-outline">
                    <input type="search" class="form-control" 
                        placeholder="Pretraga (ime)" v-model="userSearchQuery" />
                </div>
            </div>
            <hr />
            <div class="jumbotron row" style="padding-top: 15px; padding-bottom: 15px"
             v-for="kupac in filtriraniKupci"
             :key="kupac.username">
                 <div class="col">
                    <h3>{{kupac.username}}</h3>
                    <hr />
                    <h4>{{kupac.ime}} {{kupac.prezime}}</h4>
                    <p>Datum rodjenja: {{kupac.datumRodjenja.substring(0, 11)}}</p>
                    <p>Pol: {{kupac.pol}}</p>
                    <hr />
                    <p>Broj sakupljenih poena: {{kupac.sakupljenihPoena}}</p>
                    <p>Tip kupca: {{kupac.tip}}</p>
                    <hr />
                 </div>
            </div>
        </div>
    `,
    mounted() {
        let path = 'rest/kupci/' + this.$route.params.id
        axios
            .get(path)
            .then(response => {
                this.kupci = response.data
                console.log(response.data)
            })
            .catch(response => {
                alert('Desila se greška na serveru!!!')
                console.log(response)
            })
    },
    methods: {
        searchCriteria(query) {
            return function (kupac) {
                let punoIme = kupac.ime + ' ' + kupac.prezime
                if (punoIme.toUpperCase().includes(query.toUpperCase()))
                    return true
                if (kupac.username.toUpperCase().includes(query.toUpperCase()))
                    return true
                return false
            }
        }
    }
})