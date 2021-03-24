package model;

import java.util.Date;

public class Karta {
    private String ID;
    private String manifestacijaID;
    private Date datumManifestacije;
    private double cena;
    private String imeKupca;
    public enum Status {REZERVISANO, OTKAZANO}
    private Status status;
    public enum Tip {REGULAR, VIP, FAN_PIT}
    private Tip tip;
    private boolean obrisan;

    public Karta() {
        this.status = Status.REZERVISANO;
        this.obrisan = false;
    }

    public Karta(String ID, String manifestacijaID, Date datumManifestacije, double cena, String imeKupca, Tip tip) {
        this();
        this.ID = ID;
        this.manifestacijaID = manifestacijaID;
        this.datumManifestacije = datumManifestacije;
        this.cena = cena;
        this.imeKupca = imeKupca;
        this.tip = tip;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getManifestacijaID() {
        return manifestacijaID;
    }

    public void setManifestacijaID(String manifestacijaID) {
        this.manifestacijaID = manifestacijaID;
    }

    public Date getDatumManifestacije() {
        return datumManifestacije;
    }

    public void setDatumManifestacije(Date datumManifestacije) {
        this.datumManifestacije = datumManifestacije;
    }

    public double getCena() {
        return cena;
    }

    public void setCena(double cena) {
        this.cena = cena;
    }

    public String getImeKupca() {
        return imeKupca;
    }

    public void setImeKupca(String imeKupca) {
        this.imeKupca = imeKupca;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Tip getTip() {
        return tip;
    }

    public void setTip(Tip tip) {
        this.tip = tip;
    }

    public boolean isObrisan() {
        return obrisan;
    }

    public void setObrisan(boolean obrisan) {
        this.obrisan = obrisan;
    }
}
