Vue.component("register-seller", {
    data() {
        return {
            username: '',
            password: '',
            ime: '',
            prezime: '',
            pol: '',
            datumRodjenja: '',
            formError: false
        }
    },
    template: `
        <div class="container h-100">
          <div class="row h-100 justify-content-center align-items-center">
            <form style="border: 1px solid #d3d3d3; border-radius: 15px; padding: 20px;">
              <h1>Registracija novog prodavca</h1>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Korisničko ime:</label>
                  <input type="text" v-model="username" class="form-control" id="username" placeholder="Korisničko ime....">
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Lozinka:</label>
                  <input type="password" v-model="password" class="form-control" id="password" placeholder="Lozinka....">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Ime:</label>
                  <input type="text" v-model="ime" class="form-control" id="ime" placeholder="Ime....">
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Prezime:</label>
                  <input type="text" v-model="prezime" class="form-control" id="prezime" placeholder="Prezime....">
                </div>
              </div>
              <div class="form-group">
                <label for="inputAddress">Datum rođenja:</label>
                <input type="date" v-model="datumRodjenja" class="form-control" id="dat-rodj">
              </div>
              <div class="form-group">
                  <label for="pol">Pol:</label>
                  <select id="pol" v-model="pol" class="form-control">
                    <option value="m" selected>Muški</option>
                    <option value="f">Ženski</option>
                  </select>
              </div>
              <transition name="fade">
                  <div v-if="formError">
                    <small style="color: red;">Popunite sva polja!</small>
                    <hr />
                  </div>
              </transition>
              <button type="button" class="btn btn-primary" @click.prevent="register">Registruj</button>
            </form>
          </div>
        </div>
    `,
    methods: {
        register() {
            if (!(this.username && this.password && this.ime && this.prezime && this.pol && this.datumRodjenja)) {
                this.formError = true
                return
            }
            let newUser = {
                username: this.username,
                password: this.password,
                ime: this.ime,
                prezime: this.prezime,
                pol: this.pol,
                datumRodjenja: this.datumRodjenja
            }

            axios
                .post("rest/register", newUser)
                .then(response => {
                    console.log(response.data)
                    //localStorage.setItem('user', JSON.stringify(response.data))
                    this.$router.push('/')
                    window.location.reload()
                })
                .catch(response => {
                    alert('Prodavac sa tim korisničkim imenom već postoji')
                    console.log(response)
                })
        }
    }
})