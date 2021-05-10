Vue.component("user-display", {
    data () {
        return  {
            newValue: '',
            staraLozinka: '',
            ponovljenaLozinka: '',
            editError: false,
        }
    },
    computed: {
        korisnik () {
            return JSON.parse(localStorage.getItem('user'))
        }
    },
    template: `
        <div class="container h-100">
            <!-- MODAL DIJALOZI ZA EDITOVANJE -->
            <!-- MODAL DIALOG ZA EDITOVANJE IMENA KORISNIKA -->
            <div class="modal fade" id="ime-edit" tabindex="-1" role="dialog" aria-labelledby="ime-edit-lbl" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ime-edit-lbl">Izmena imena:</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="novo-ime" class="col-form-label">Novo ime:</label>
                                    <input type="text" class="form-control" id="novo-ime" v-model="newValue">
                                </div>
                            </form>
                            <p v-if="editError" style="color: red;">Popunite polje</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-dismiss="modal" @click="clearEdit">Zatvori</button>
                            <button type="button" class="btn btn-primary" @click="edit('ime')">Izmeni</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- MODAL DIJALOG ZA EDITOVANJE PREZIMENA -->
            <div class="modal fade" id="prezime-edit" tabindex="-1" role="dialog" aria-labelledby="prezime-edit-lbl" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="prezime-edit-lbl">Izmena prezimena:</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="novo-prezime" class="col-form-label">Novo prezime:</label>
                                    <input type="text" class="form-control" id="novo-prezime" v-model="newValue">
                                </div>
                            </form>
                            <p v-if="editError" style="color: red;">Popunite polje</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-dismiss="modal" @click="clearEdit">Zatvori</button>
                            <button type="button" class="btn btn-primary" @click="edit('prezime')">Izmeni</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- MODAL DIJALOG ZA EDITOVANJE DATUMA ROĐENJA -->
            <div class="modal fade" id="datumrdj-edit" tabindex="-1" role="dialog" aria-labelledby="datumrdj-edit-lbl" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="datumrdj-edit-lbl">Izmena datuma rođenja:</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="novi-datum" class="col-form-label">Novi datum rođenja:</label>
                                    <input type="date" class="form-control" id="novi-datum" v-model="newValue">
                                </div>
                            </form>
                            <p v-if="editError" style="color: red;">Popunite polje</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-dismiss="modal" @click="clearEdit">Zatvori</button>
                            <button type="button" class="btn btn-primary" @click="edit('datumRodjenja')">Izmeni</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- MODAL DIJALOG ZA EDITOVANJE LOZINKE -->
            <div class="modal fade" id="lozinka-edit" tabindex="-1" role="dialog" aria-labelledby="lozinka-edit-lbl" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="lozinka-edit-lbl">Izmena lozinke:</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="stara-lozinka" class="col-form-label">Stara lozinka:</label>
                                    <input type="password" class="form-control" id="man-tip" v-model="staraLozinka">
                                </div>
                                <div class="form-group">
                                    <label for="nova-lozinka" class="col-form-label">Nova lozinka:</label>
                                    <input type="password" class="form-control" id="nova-lozinka" v-model="newValue">
                                </div>
                                <div class="form-group">
                                    <label for="ponovo-lozinka" class="col-form-label">Unesite ponovo:</label>
                                    <input type="password" class="form-control" id="ponovo-lozinka" v-model="ponovljenaLozinka">
                                </div>
                            </form>
                            <p v-if="editError" style="color: red;">Nepravilan unos!</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-dismiss="modal" @click="clearEdit">Zatvori</button>
                            <button type="button" class="btn btn-primary" @click="edit('password')">Izmeni</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!--SADRZAJ STRANICE ZA PRIKAZ PODATAKA O KORISNIKU -->
            <div class="row h-100 justify-content-center align-items-center">
                <div style="width: 60%; border: 1px solid #d3d3d3; border-radius: 15px; padding: 20px;">
                    <h1>Pregled profila</h1>
                    <hr />
                    <h2>Korisnik: {{korisnik.username}}</h2>
                    <div class="row">
                        <p class="col-md-9"><strong>Ime: </strong>{{korisnik.ime}}</p>
                        <button class="btn btn-sm col-md-3" data-toggle="modal" data-target="#ime-edit">
                            Izmeni
                        </button>
                    </div>
                    <div class="row">
                        <p class="col-md-9"><strong>Prezime: </strong>{{korisnik.prezime}}</p>
                        <button class="btn btn-sm col-md-3" data-toggle="modal" data-target="#prezime-edit">
                            Izmeni
                        </button>
                    </div>
                    <div class="row">
                        <p class="col-md-9"><strong>Datum rođenja: </strong>{{korisnik.datumRodjenja.substring(0, 11)}}</p>
                        <button class="btn btn-sm col-md-3" data-toggle="modal" data-target="#datumrdj-edit">
                            Izmeni
                        </button>
                    </div>
                    <p><strong>Pol: </strong>{{korisnik.pol}}</p>
                    <p><strong>Uloga: </strong>{{korisnik.uloga}}</p>
                    <template v-if="korisnik.uloga == 'KUPAC'">
                        <hr />
                        <p><strong>Broj bodova: </strong>{{korisnik.sakupljenihPoena}}</p>
                        <p><strong>Tip korisnika: </strong>{{korisnik.tip}}</p>
                    </template>
                    <hr />
                    <p><strong>Korisničko ime: </strong>{{korisnik.username}}</p>
                    
                    <div class="row">
                        <p class="col-md-9">
                            <strong>Lozinka: </strong><button class="btn btn-light" @click="lozinka">Prikaži</button>
                        </p>
                        <button class="btn btn-sm col-md-3" data-toggle="modal" data-target="#lozinka-edit">
                            Izmeni
                        </button>
                    </div>
                    <hr />
                    <br />
                    <hr />
                    <div class="text-center">
                        <button class="btn btn-lg btn-primary">Izmeni</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        lozinka() {
            alert('Vaša loznika: ' + this.korisnik.password)
        },
        edit(attribute) {
            if (attribute === 'password') {
                if (this.newValue !== this.ponovljenaLozinka || this.staraLozinka !== this.korisnik.password) {
                    this.editError = true;
                    return;
                }
            }
            if (this.newValue.trim() === '') {
                this.editError = true;
                return;
            }
            let newValObject = {
                attribute: attribute,
                value: this.newValue.trim()
            }
            console.log(newValObject)
            this.editError = false;

            let path = 'rest/edit/' + this.korisnik.username
            axios
                .put(path, newValObject)
                .then(response => {
                    alert('Uspešno izmenjeni podaci')
                    console.log(response)
                    let editedKorisnik = this.korisnik //JSON.parse(JSON.stringify(this.korisnik))
                    editedKorisnik[attribute] = this.newValue
                    localStorage.setItem('user', JSON.stringify(editedKorisnik))
                    this.$router.go()
                })
                .catch(response => {
                    alert('Nepravilni podaci! Neočekivana greška')
                    console.log(response)
                })
        },
        clearEdit() {
            console.log('cleared')
            this.newValue = ''
            this.staraLozinka = ''
            this.ponovljenaLozinka = ''
            this.editError = false;
        }
    }
})