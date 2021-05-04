package model;

import java.util.Date;

public class Administrator extends Korisnik {
    public Administrator() {
        super();
        this.uloga = Uloga.ADMIN;
    }

    public Administrator(String username, String password, String ime, String prezime, String pol, Date datumRodjenja) {
        super(username, password, ime, prezime, pol, datumRodjenja);
        this.uloga = Uloga.ADMIN;
    }
}
