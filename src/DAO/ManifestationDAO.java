package DAO;

import com.google.gson.Gson;
import model.Manifestacija;
import org.opencv.core.Mat;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

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

    public boolean ProveriDostupnost(Manifestacija novaManifestacija) {
        for (Manifestacija m : this.manifestacije) {
            long diff_millis = Math.abs(m.getVremeOdrzavanja().getTime() - novaManifestacija.getVremeOdrzavanja().getTime());
            long diff_in_minutes = TimeUnit.MINUTES.convert(diff_millis, TimeUnit.MILLISECONDS);
            boolean istoMesto = novaManifestacija.getLokacija().getAdresa().equals(m.getLokacija().getAdresa()); /*&&
                    novaManifestacija.getLokacija().equals(m.getLokacija()); */
            if (istoMesto && diff_in_minutes < 30)
                return false;
        }
        //TODO: Zavrsiti dodavanje manifestacija!!!
        return true;
    }
}
