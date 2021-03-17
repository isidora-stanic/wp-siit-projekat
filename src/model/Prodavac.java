package model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Prodavac extends Korisnik {
    private List<String> manifestacijeIDs; //Lista ID-jeva manifestacija koje prodavac odrzava

    public Prodavac() {
        super();
        this.uloga = Uloga.PRODAVAC;
        manifestacijeIDs = new ArrayList<>();
    }

    public Prodavac(String username, String password, String ime, String prezime, String pol, Date datumRodjenja) {
        super(username, password, ime, prezime, pol, datumRodjenja);
        this.uloga = Uloga.PRODAVAC;
        manifestacijeIDs = new ArrayList<>();
    }

    public List<String> getManifestacije() {
        return manifestacijeIDs;
    }

    public void setManifestacije(List<String> manifestacije) {
        this.manifestacijeIDs = manifestacije;
    }
}
