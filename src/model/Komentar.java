package model;

public class Komentar {
    private String ID;
    private String korisnik;
    private String manifestacijaID;
    private boolean prihvacenoOdProdavca;
    private String tekst;
    private int ocena;
    private boolean obrisan;

    public Komentar() {
        this.prihvacenoOdProdavca = false;
        this.obrisan = false;
    }

    public Komentar(String id, String korisnik, String manifestacijaID, String tekst, int ocena) {
        this();
        this.ID = id;
        this.korisnik = korisnik;
        this.manifestacijaID = manifestacijaID;
        this.tekst = tekst;
        this.ocena = ocena;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getKorisnik() {
        return korisnik;
    }

    public void setKorisnik(String korisnik) {
        this.korisnik = korisnik;
    }

    public String getManifestacijaID() {
        return manifestacijaID;
    }

    public void setManifestacijaID(String manifestacijaID) {
        this.manifestacijaID = manifestacijaID;
    }

    public boolean isPrihvacenoOdProdavca() {
        return prihvacenoOdProdavca;
    }

    public void setPrihvacenoOdProdavca(boolean prihvacenoOdProdavca) {
        this.prihvacenoOdProdavca = prihvacenoOdProdavca;
    }

    public String getTekst() {
        return tekst;
    }

    public void setTekst(String tekst) {
        this.tekst = tekst;
    }

    public int getOcena() {
        return ocena;
    }

    public void setOcena(int ocena) {
        this.ocena = ocena;
    }

    public boolean isObrisan() {
        return obrisan;
    }

    public void setObrisan(boolean obrisan) {
        this.obrisan = obrisan;
    }
}
