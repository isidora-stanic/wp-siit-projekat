package model;

public class Lokacija {
    private double geografskaSirina;
    private double geografskaDuzina;
    private Adresa adresa;

    public Lokacija() {
    }

    public Lokacija(double geografskaSirina, double geografskaDuzina, Adresa adresa) {
        this.geografskaSirina = geografskaSirina;
        this.geografskaDuzina = geografskaDuzina;
        this.adresa = adresa;
    }

    public double getGeografskaSirina() {
        return geografskaSirina;
    }

    public void setGeografskaSirina(double geografskaSirina) {
        this.geografskaSirina = geografskaSirina;
    }

    public double getGeografskaDuzina() {
        return geografskaDuzina;
    }

    public void setGeografskaDuzina(double geografskaDuzina) {
        this.geografskaDuzina = geografskaDuzina;
    }

    public Adresa getAdresa() {
        return adresa;
    }

    public void setAdresa(Adresa adresa) {
        this.adresa = adresa;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null)
            return false;

        if (!(obj instanceof  Lokacija))
            return false;

        Lokacija other = (Lokacija) obj;

        if (other == this)
            return true;

        return this.geografskaDuzina == other.geografskaDuzina &&
                this.geografskaSirina == other.geografskaSirina;
    }
}
