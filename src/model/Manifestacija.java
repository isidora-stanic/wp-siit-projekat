package model;

import java.util.Date;
import java.util.Objects;

public class Manifestacija {
    private String ID;
    private String ime;
    private String tip;
    private int ukupnoMesta;
    private int prodatoKarata;
    private Date vremeOdrzavanja;
    private Double cenaKarte;
    public enum Status {AKTIVNA, NEAKTIVNA, ODBIJENA}
    private Status status;
    private Lokacija lokacija;
    private String slika;

    public Manifestacija() {
        this.prodatoKarata = 0;
        this.status = Status.NEAKTIVNA;
    }

    public Manifestacija(String ID, String ime, String tip, int ukupnoMesta, Date vremeOdrzavanja, Double cenaKarte, Lokacija lokacija, String slika) {
        this();
        this.ID = ID;
        this.ime = ime;
        this.tip = tip;
        this.ukupnoMesta = ukupnoMesta;
        this.vremeOdrzavanja = vremeOdrzavanja;
        this.cenaKarte = cenaKarte;
        this.lokacija = lokacija;
        this.slika = slika;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public int getUkupnoMesta() {
        return ukupnoMesta;
    }

    public void setUkupnoMesta(int ukupnoMesta) {
        this.ukupnoMesta = ukupnoMesta;
    }

    public int getProdatoKarata() {
        return prodatoKarata;
    }

    public void setProdatoKarata(int prodatoKarata) {
        this.prodatoKarata = prodatoKarata;
    }

    public Date getVremeOdrzavanja() {
        return vremeOdrzavanja;
    }

    public void setVremeOdrzavanja(Date vremeOdrzavanja) {
        this.vremeOdrzavanja = vremeOdrzavanja;
    }

    public Double getCenaKarte() {
        return cenaKarte;
    }

    public void setCenaKarte(Double cenaKarte) {
        this.cenaKarte = cenaKarte;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Lokacija getLokacija() {
        return lokacija;
    }

    public void setLokacija(Lokacija lokacija) {
        this.lokacija = lokacija;
    }

    public String getSlika() {
        return slika;
    }

    public void setSlika(String slika) {
        this.slika = slika;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Manifestacija that = (Manifestacija) o;

        return ID.equals(that.ID);
    }

    @Override
    public int hashCode() {
        return ID != null ? ID.hashCode() : 0;
    }
}
