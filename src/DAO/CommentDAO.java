package DAO;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import model.Komentar;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

public class CommentDAO {
    private final ArrayList<Komentar> komentari = new ArrayList<>();
    private final Map<String, Komentar> komentariMap = new HashMap<>();
    private final Gson g = new GsonBuilder().setPrettyPrinting().create();

    public CommentDAO() {}

    public void dodajKomentar(Komentar k) {
        this.komentari.add(k);
        this.komentariMap.put(k.getID(), k);
    }

    public ArrayList<Komentar> getKomentari() { return this.komentari; }

    public Komentar getKomentarByID(String id) {
        if (this.komentariMap.containsKey(id))
            return this.komentariMap.get(id);

        return null;
    }

    public List<Komentar> getKomentariByManifestacija(String manifID) {
        List<Komentar> manifKomentari = new ArrayList<>();
        for (Komentar k : komentari) {
            if (!k.isObrisan() && k.getManifestacijaID().equals(manifID))
                manifKomentari.add(k);
        }
        return manifKomentari;
    }

    public void loadKomentari() throws IOException {
        String komentariString = Files.readString(Paths.get("resources/komentari.json"));
        Komentar[] komentariArray = g.fromJson(komentariString, Komentar[].class);
        for (Komentar k : komentariArray)
            this.dodajKomentar(k);
    }

    public void saveKomentari() throws IOException {
        PrintWriter pw = new PrintWriter(new FileWriter("resources/komentari.json", false));
        pw.println(g.toJson(this.komentari));
        pw.close();
    }

    public String generateID() {
        Random random = new Random(System.currentTimeMillis());
        while (true) {
            double rndDouble = random.nextDouble();
            String generatedID = Double.toString(rndDouble).substring(2, 12);
            if (!komentariMap.containsKey(generatedID))
                return generatedID;
        }
    }
}
