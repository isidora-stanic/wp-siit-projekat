package model;

import java.util.Date;

public abstract class Korisnik {
    protected String username;
    protected String password;
    protected String ime;
    protected String prezime;
    protected String pol;
    protected Date datumRodjenja;
    public enum Uloga { ADMIN, KUPAC, PRODAVAC }
    protected Uloga uloga;
    protected boolean korisnikAktivan;
    protected boolean korisnikBlokiran;

    public Korisnik() {
        this.korisnikAktivan = true;
        this.korisnikBlokiran = false;
    }

    public Korisnik(String username, String password, String ime, String prezime, String pol, Date datumRodjenja) {
        this();
        this.username = username;
        this.password = password;
        this.ime = ime;
        this.prezime = prezime;
        this.pol = pol;
        this.datumRodjenja = datumRodjenja;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getPol() {
        return pol;
    }

    public void setPol(String pol) {
        this.pol = pol;
    }

    public Date getDatumRodjenja() {
        return datumRodjenja;
    }

    public void setDatumRodjenja(Date datumRodjenja) {
        this.datumRodjenja = datumRodjenja;
    }

    public Uloga getUloga() {
        return uloga;
    }

    public void setUloga(Uloga uloga) {
        this.uloga = uloga;
    }

    public boolean isKorisnikAktivan() {
        return korisnikAktivan;
    }

    public void setKorisnikAktivan(boolean korisnikAktivan) {
        this.korisnikAktivan = korisnikAktivan;
    }

    public boolean isKorisnikBlokiran() {
        return korisnikBlokiran;
    }

    public void setKorisnikBlokiran(boolean korisnikBlokiran) {
        this.korisnikBlokiran = korisnikBlokiran;
    }
}
