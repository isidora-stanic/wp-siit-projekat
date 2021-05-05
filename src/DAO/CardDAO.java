package DAO;

import com.google.gson.Gson;
import model.Karta;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class CardDAO {
    private final ArrayList<Karta> karte = new ArrayList<>();
    private final Map<String, Karta> karteHashMap = new HashMap<>();
    private final Gson g = new Gson();

    public CardDAO() {}

    public void dodajKartu(Karta m) {
        this.karte.add(m);
        this.karteHashMap.put(m.getID(), m);
    }

    public ArrayList<Karta> getKarte() {
        return this.karte;
    }

    public Karta getKartaByID(String id) {
        if (this.karteHashMap.containsKey(id))
            return this.karteHashMap.get(id);

        return null;
    }

    public void loadKarte() throws IOException {
        String karteString = Files.readString(Paths.get("resources/karte.json"));
        Karta[] karte = g.fromJson(karteString, Karta[].class);
        for (Karta m : karte) {
            this.karte.add(m);
            this.karteHashMap.put(m.getID(), m);
        }
    }

    public void saveKarte() throws IOException{
        PrintWriter pw = new PrintWriter(new FileWriter("resources/karte.json", false));
        pw.println(g.toJson(this.karte));
        pw.close();
    }
}
