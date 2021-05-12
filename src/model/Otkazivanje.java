package model;

import java.util.Date;

public class Otkazivanje {
    private String kupacID;
    private String kartaID;
    private Date datumOtkazivanja;

    public Otkazivanje() {
    }

    public Otkazivanje(String kupacID, String kartaID, Date datumOtkazivanja) {
        this.kupacID = kupacID;
        this.kartaID = kartaID;
        this.datumOtkazivanja = datumOtkazivanja;
    }

    public String getKupacID() {
        return kupacID;
    }

    public void setKupacID(String kupacID) {
        this.kupacID = kupacID;
    }

    public String getKartaID() {
        return kartaID;
    }

    public void setKartaID(String kartaID) {
        this.kartaID = kartaID;
    }

    public Date getDatumOtkazivanja() {
        return datumOtkazivanja;
    }

    public void setDatumOtkazivanja(Date datumOtkazivanja) {
        this.datumOtkazivanja = datumOtkazivanja;
    }
}
