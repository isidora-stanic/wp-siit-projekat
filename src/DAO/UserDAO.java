package DAO;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.google.gson.Gson;
import model.Korisnik;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class UserDAO {
    private final ArrayList<Korisnik> korisnici = new ArrayList<>();
    private final Map<String, Korisnik> korisniciMap = new HashMap<>();
    private final Gson g = new Gson();

    public UserDAO() { }

    public void dodajKorisnika(Korisnik k) {
        this.korisnici.add(k);
        this.korisniciMap.put(k.getUsername(), k);
    }

    public ArrayList<Korisnik> getKorisnici() {
        return korisnici;
    }

    public Korisnik getKorisnikByUsername(String username) {
        if (korisniciMap.containsKey(username))
            return this.korisniciMap.get(username);

        return null;
    }

    public void loadKorisnici() throws IOException {
        /* Koristimo jackson da bi se deserijalizovali
            uz polimorfizam (npr. Admin u Korisnik) sa ocuvanjem
            podataka pojedinacnih klasa */

        ObjectMapper mpr = new ObjectMapper();
        mpr.enable(SerializationFeature.INDENT_OUTPUT);
        mpr.enableDefaultTyping();
        mpr.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mpr.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);

        Korisnik[] korisnici = mpr.readValue(new File("resources/korisnici.json"), Korisnik[].class);
        for (Korisnik k : korisnici) {
            this.korisnici.add(k);
            this.korisniciMap.put(k.getUsername(), k);
        }
    }

    public void saveKorisnici() throws IOException{
        ObjectMapper mpr = new ObjectMapper();

        mpr.enable(SerializationFeature.INDENT_OUTPUT);
        mpr.enableDefaultTyping();
        mpr.writeValue(new File("resources/korisnici.json"), this.korisnici);
    }
}
