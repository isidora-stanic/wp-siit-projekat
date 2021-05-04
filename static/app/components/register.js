Vue.component("register", {
    data() {
        return {
            username: '',
            password: '',
            ime: '',
            prezime: '',
            pol: '',
            datumRodjenja: '',
        }
    },
    template: `
        <div class="container h-100">
          <div class="row h-100 justify-content-center align-items-center">
            <form style="border: 1px solid #d3d3d3; border-radius: 15px; padding: 20px;">
              <h1>Registracija na sistem</h1>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Korisničko ime:</label>
                  <input type="text" class="form-control" id="username" placeholder="Korisničko ime....">
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Lozinka:</label>
                  <input type="password" class="form-control" id="password" placeholder="Lozinka....">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Ime:</label>
                  <input type="text" class="form-control" id="ime" placeholder="Ime....">
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Prezime:</label>
                  <input type="text" class="form-control" id="prezime" placeholder="Prezime....">
                </div>
              </div>
              <div class="form-group">
                <label for="inputAddress">Datum rođenja:</label>
                <input type="date" class="form-control" id="dat-rodj">
              </div>
              <div class="form-group">
                  <label for="pol">Pol:</label>
                  <select id="pol" class="form-control">
                    <option value="m" selected>Muški</option>
                    <option value="f">Ženski</option>
                  </select>
              </div>
              <button type="submit" class="btn btn-primary">Sign in</button>
            </form>
          </div>
        </div>
    `
})