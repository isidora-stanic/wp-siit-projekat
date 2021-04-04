package DAO;

import com.google.gson.Gson;
import model.Manifestacija;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class ManifestationDAO {
    private final ArrayList<Manifestacija> manifestacije = new ArrayList<>();
    private final Map<String, Manifestacija> manifestacijeHashMap = new HashMap<>();
    private final Gson g = new Gson();

    public ManifestationDAO() {}

    public void dodajManifestaciju(Manifestacija m) {
        this.manifestacije.add(m);
        this.manifestacijeHashMap.put(m.getID(), m);
    }

    public ArrayList<Manifestacija> getManifestacije() {
        return this.manifestacije;
    }

    public Manifestacija getManifestacijaByID(String id) {
        if (this.manifestacijeHashMap.containsKey(id))
            return this.manifestacijeHashMap.get(id);

        return null;
    }

    public void loadManifestacije() throws IOException {
        String manifestacijeString = Files.readString(Paths.get("resources/manifestacije.json"));
        Manifestacija[] manifestacije = g.fromJson(manifestacijeString, Manifestacija[].class);
        for (Manifestacija m : manifestacije) {
            this.manifestacije.add(m);
            this.manifestacijeHashMap.put(m.getID(), m);
        }
    }

    public void saveManifestacije() throws IOException{
        PrintWriter pw = new PrintWriter(new FileWriter("resources/manifestacije.json", false));
        pw.println(g.toJson(this.manifestacije));
        pw.close();
    }
}
