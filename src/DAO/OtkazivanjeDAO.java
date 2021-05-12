package DAO;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import model.Otkazivanje;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class OtkazivanjeDAO {
    private final ArrayList<Otkazivanje> otkazivanja = new ArrayList<>();
    private final Gson g = new GsonBuilder().setPrettyPrinting().create();

    public OtkazivanjeDAO() { }

    public void dodajOtkazivanje(Otkazivanje otkazivanje) {
        this.otkazivanja.add(otkazivanje);
    }

    public ArrayList<Otkazivanje> getOtkazivanja() { return this.otkazivanja; }

    public List<Otkazivanje> getOtkazivanjaByKorisnik(String kupacID) {
        return otkazivanja
                .stream()
                .filter(otkazivanje -> otkazivanje.getKupacID().equals(kupacID))
                .collect(Collectors.toList());
    }

    public void loadOtkazivanja() throws IOException {
        String otkazivanjaString = Files.readString(Paths.get("resources/otkazivanja.json"));
        Otkazivanje[] otkazivanjaArray = g.fromJson(otkazivanjaString, Otkazivanje[].class);
        this.otkazivanja.addAll(Arrays.asList(otkazivanjaArray));
    }

    public void saveOtkazivanja() throws IOException {
        PrintWriter pw = new PrintWriter(new FileWriter("resources/otkazivanja.json", false));
        pw.println(g.toJson(this.otkazivanja));
        pw.close();
    }
}
