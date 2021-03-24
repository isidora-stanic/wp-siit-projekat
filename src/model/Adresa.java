package model;

public class Adresa {
    private String ulicaIBroj;
    private String mesto;
    private String postanskiBroj;

    public Adresa() {
    }

    public Adresa(String ulicaIBroj, String mesto, String postanskiBroj) {
        this.ulicaIBroj = ulicaIBroj;
        this.mesto = mesto;
        this.postanskiBroj = postanskiBroj;
    }

    public String getUlicaIBroj() {
        return ulicaIBroj;
    }

    public void setUlicaIBroj(String ulicaIBroj) {
        this.ulicaIBroj = ulicaIBroj;
    }

    public String getMesto() {
        return mesto;
    }

    public void setMesto(String mesto) {
        this.mesto = mesto;
    }

    public String getPostanskiBroj() {
        return postanskiBroj;
    }

    public void setPostanskiBroj(String postanskiBroj) {
        this.postanskiBroj = postanskiBroj;
    }
}
