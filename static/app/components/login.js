Vue.component("login", {
    data () {
        return {
            username: '',
            password: ''
        }
    },
    template: `
        <div class="container h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-10 col-md-8 col-lg-6">
                    <form class="form-example" style="border: 1px solid #d3d3d3; border-radius: 15px; padding: 20px;">
                        <h1>Prijava na sistem</h1>
                        <div class="form-group">
                            <label for="username">Korisničko ime:</label>
                            <input type="text" class="form-control username" id="username" 
                            placeholder="Korisničko ime..." name="username" v-model="username">
                        </div>
                        <div class="form-group">
                            <label for="password">Lozinka:</label>
                            <input type="password" class="form-control password" id="password" 
                            placeholder="Lozinka..." name="password" v-model="password">
                        </div>
                        <button type="button" class="btn btn-primary btn-customized" @click="logIn">Prijava</button>
                    </form>
                </div>
            </div>
        </div>
    `,
    methods: {
        logIn() {
            alert(this.username + ' ' + this.password)
        }
    }
})