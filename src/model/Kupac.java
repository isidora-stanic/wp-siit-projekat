package model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Kupac extends Korisnik {
    private List<Karta> kupljeneKarte;
    private int sakupljenihPoena;
    private TipKorisnika.Tip tip;

    public Kupac() {
        super();
        this.uloga = Uloga.KUPAC;
        this.kupljeneKarte = new ArrayList<>();
        this.sakupljenihPoena = 0;
        this.tip = TipKorisnika.Tip.BRONZE;
    }

    public Kupac(String username, String password, String ime, String prezime, String pol, Date datumRodjenja) {
        super(username, password, ime, prezime, pol, datumRodjenja);
        this.uloga = Uloga.KUPAC;
        this.kupljeneKarte = new ArrayList<>();
        this.sakupljenihPoena = 0;
        this.tip = TipKorisnika.Tip.BRONZE;
    }

    public List<Karta> getKupljeneKarte() {
        return kupljeneKarte;
    }

    public void setKupljeneKarte(List<Karta> kupljeneKarte) {
        this.kupljeneKarte = kupljeneKarte;
    }

    public int getSakupljenihPoena() {
        return sakupljenihPoena;
    }

    public void setSakupljenihPoena(int sakupljenihPoena) {
        this.sakupljenihPoena = sakupljenihPoena;
    }

    public TipKorisnika.Tip getTip() {
        return tip;
    }

    public void setTip(TipKorisnika.Tip tip) {
        this.tip = tip;
    }
}
