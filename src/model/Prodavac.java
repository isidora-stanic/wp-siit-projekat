package model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Prodavac extends Korisnik {
    private List<Manifestacija> manifestacije;

    public Prodavac() {
        super();
        this.uloga = Uloga.PRODAVAC;
        manifestacije = new ArrayList<>();
    }

    public Prodavac(String username, String password, String ime, String prezime, String pol, Date datumRodjenja) {
        super(username, password, ime, prezime, pol, datumRodjenja);
        this.uloga = Uloga.PRODAVAC;
        manifestacije = new ArrayList<>();
    }

    public List<Manifestacija> getManifestacije() {
        return manifestacije;
    }

    public void setManifestacije(List<Manifestacija> manifestacije) {
        this.manifestacije = manifestacije;
    }
}
