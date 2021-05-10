Vue.component("manifestation-buyers", {
    data() {
        return {
            kupci: []
        }
    },
    template: `
        <div class="container">
            <div class="page-header">
                <h1>Pregled kupaca karata za manifestaciju</h1>
            </div>
            <hr />
            <div class="jumbotron row" style="padding-top: 15px; padding-bottom: 15px"
             v-for="kupac in kupci"
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
    }
})