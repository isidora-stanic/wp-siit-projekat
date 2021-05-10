package DAO;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import model.Karta;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

public class CardDAO {
    private final ArrayList<Karta> karte = new ArrayList<>();
    private final Map<String, Karta> karteHashMap = new HashMap<>();
    private final Gson g = new GsonBuilder().setPrettyPrinting().create();

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

    public List<Karta> getKartaByManifID(String id) {
        List<Karta> karteLista = new ArrayList<>();
        for (Karta k : karte) {
            if (k.getManifestacijaID().equals(id))
                karteLista.add(k);
        }
        return karteLista;
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

    public String generateID() {
        Random random = new Random(System.currentTimeMillis());
        while (true){
            double rndDouble = random.nextDouble();
            String generatedID = Double.toString(rndDouble).substring(2,12);
            if (!karteHashMap.containsKey(generatedID))
                return generatedID;
        }

    }
}
