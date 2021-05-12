Vue.component("user-list", {
    data() {
        return {
            users: [],
            userSearchQuery: '',
        }
    },
    props: ['context'],
    template: `
        <div class="container">
            <div class="page-header">
                <h1 v-if="context === 'ALL'">Pregled svih korisnika</h1>
                <h1 v-else="context === 'SUS'">Pregled sumnjivih korisnika</h1>
            </div>
            <div class="input-group">
                <div class="form-outline">
                    <input type="search" class="form-control" 
                        placeholder="Pretraga (ime)" v-model="userSearchQuery" />
                </div>
            </div>
            <hr />
            <div class="jumbotron row" style="padding-top: 15px; padding-bottom: 15px"
             v-for="korisnik in users"
             :key="korisnik.username">
                 <div class="col">
                    <h3>{{korisnik.username}}</h3>
                    <hr />
                    <h4>{{korisnik.ime}} {{korisnik.prezime}}</h4>
                    <p>Datum rodjenja: {{korisnik.datumRodjenja.substring(0, 11)}}</p>
                    <p>Pol: {{korisnik.pol}}</p>
                    <p>Uloga: {{korisnik.uloga}}</p>
                    <template v-if="korisnik.uloga === 'KUPAC'">
                        <hr />
                        <p>Broj sakupljenih poena: {{korisnik.sakupljenihPoena}}</p>
                        <p>Tip kupca: {{korisnik.tip}}</p>
                    </template>
                    <hr />
                    <template v-if="korisnik.uloga !== 'ADMIN'">
                        <button class="btn btn-primary">Blokiraj</button>
                        <button class="btn btn-primary">Obrisi</button>
                    </template>
                 </div>
            </div>
        </div>
    `,
    mounted() {
        let addedPath = this.context === 'ALL' ? 'all' : 'sus'
        let path = 'rest/korisnici/' + addedPath
        console.log(this.context)
        console.log(path)
        axios
            .get(path)
            .then(response => {
                this.users = response.data
            })
            .catch(error => {
                console.log(error.response.data)
            })
    },
})