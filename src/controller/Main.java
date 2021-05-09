package controller;

import DAO.CardDAO;
import DAO.ManifestationDAO;
import DAO.UserDAO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import model.*;

import java.io.*;
import java.util.ArrayList;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import static spark.Spark.*;

public class Main {
    private static final ManifestationDAO manifestationDAO = new ManifestationDAO();
    private static final CardDAO cardDAO = new CardDAO();
    private static final UserDAO userDAO = new UserDAO();
    private static final Gson g = new Gson();

    public static void main(String[] args) throws IOException {
//        dumpUsers();

        manifestationDAO.loadManifestacije();
        userDAO.loadKorisnici();
        cardDAO.loadKarte();

        staticFiles.externalLocation(new File("./static").getCanonicalPath());
        port(8080);

        get("/rest/manifestacije", (req, res) -> {
           res.type("application/json");
           return g.toJson(manifestationDAO.getManifestacije());
        });

        get("/rest/manifestacija/:id", (req, res) -> {
            Manifestacija m = manifestationDAO.getManifestacijaByID(req.params(":id"));

            if (m == null) {
                res.status(404);
                return "Manifestation with given ID not found";
            }

            res.type("application/json");
            return g.toJson(m);
        });

        get("/rest/karte", (req, res) -> {
            res.type("application/json");
            ArrayList<Karta> karte = cardDAO.getKarte();
            return g.toJson(cardDAO.getKarte());
        });

        get("/rest/karte/:username", (req, res) -> {
            res.type("application/json");
            Kupac u = (Kupac) userDAO.getKorisnikByUsername(req.params(":username"));
            List<String> karteIDs = u.getKupljeneKarte();
            ArrayList<Karta> karte = new ArrayList<>();
            for (String kID : karteIDs) {
                karte.add(cardDAO.getKartaByID(kID));
            }
            return g.toJson(karte);
        });

        get("/rest/karte-prodavca/:username", (req, res) -> {
            res.type("application/json");
            Prodavac u = (Prodavac) userDAO.getKorisnikByUsername(req.params(":username"));
            List<String> manifIDs = u.getManifestacije();
            ArrayList<Karta> karte = new ArrayList<>();
            for (String mID : manifIDs) {
                List<Karta> manifs = cardDAO.getKartaByManifID(mID);
                for (Karta k : manifs) {
                    if (!(k.isObrisan() || k.getStatus() == Karta.Status.OTKAZANO))
                        karte.add(k);
                }
            }
            return g.toJson(karte);
        });

        post("/rest/register", (req, res) -> {
            HashMap<String, String> userMap = g.fromJson(req.body(), HashMap.class);

            String username = userMap.get("username");
            String password = userMap.get("password");
            String ime = userMap.get("ime");
            String prezime = userMap.get("prezime");
            String pol = userMap.get("pol");
            Date datumRodjenja = new SimpleDateFormat("yyyy-MM-dd")
                                .parse(userMap.get("datumRodjenja"));

            if (userDAO.getKorisnikByUsername(username) != null) {
                res.status(404);
                return "Korisnik sa tim korisničkim imenom već postoji";
            }

            Korisnik k = new Kupac(username, password, ime, prezime, pol, datumRodjenja);
            userDAO.dodajKorisnika(k);
            userDAO.saveKorisnici();

            res.type("application/json");
            res.status(200);
            return g.toJson(k);
        });

        post("/rest/login", (req, res) -> {
            HashMap<String, String> userMap = g.fromJson(req.body(), HashMap.class);
            String username = userMap.get("username");
            String password = userMap.get("password");
            Korisnik k = userDAO.getKorisnikByUsername(username);
            if (k == null) {
                res.status(404);
                return null;
            }
            if (!k.getPassword().equals(password)) {
                res.status(404);
                return null;
            }

            return g.toJson(k);
        });
    }

    public static void dumpManifestations() throws IOException {
        Adresa adresa = new Adresa("Heroja Jerkovica 37", "Uzice", "31000");
        Lokacija lok = new Lokacija(25, 35, adresa);
        Date date = new Date();

        //Manifestacija(
        // String ID, String ime, String tip, int ukupnoMesta, Date vremeOdrzavanja,
        // Double cenaKarte, Lokacija lokacija)
        Manifestacija m1 = new Manifestacija("1", "M1", "Koncert", 100, new Date(), 1000.00, lok, "zvonko_bogdan_2019.jpg");
        Manifestacija m2 = new Manifestacija("2", "M2", "Koncert", 100, new Date(), 1000.00, lok, "zvonko_bogdan_2019.jpg");
        Manifestacija m3 = new Manifestacija("3", "M3", "Koncert", 100, new Date(), 1000.00, lok, "zvonko_bogdan_2019.jpg");
        Gson g = new GsonBuilder().setPrettyPrinting().create();
        Manifestacija[] manifestacije = {m1, m2, m3};
        PrintWriter pw = new PrintWriter(new FileWriter("resources/manifestacije.json", false));
        pw.println(g.toJson(manifestacije));
        pw.close();
    }

    public static void dumpCards() throws IOException {
        Adresa adresa = new Adresa("Heroja Jerkovica 37", "Uzice", "31000");
        Lokacija lok = new Lokacija(25, 35, adresa);
        Date date = new Date();
        //Manifestacija(
        // String ID, String ime, String tip, int ukupnoMesta, Date vremeOdrzavanja,
        // Double cenaKarte, Lokacija lokacija)
        Karta k1 = new Karta("10karakter", "1", new Date(), 1000.00, "Kupac 1", Karta.Tip.VIP);
        Karta k2 = new Karta("0karaktera", "2", new Date(), 1000.00, "Kupac 1", Karta.Tip.FAN_PIT);
        Karta k3 = new Karta("karaktera.", "3", new Date(), 1000.00, "Kupac 2", Karta.Tip.REGULAR);
        Gson g = new GsonBuilder().setPrettyPrinting().create();
        Karta[] karte = {k1, k2, k3};
        PrintWriter pw = new PrintWriter(new FileWriter("resources/karte.json", false));
        pw.println(g.toJson(karte));
        pw.close();
    }

    public static void dumpUsers() throws IOException {
        Date date = new Date();
        Administrator k1 = new Administrator("admin", "admin", "adminko", "adminic", "m", date);
        Kupac k2 = new Kupac("matija", "m1234", "matija", "matovic", "m", date);
        Prodavac k3 = new Prodavac("prodavac", "12345", "Milena", "Milenic", "f", date);

        k2.getKupljeneKarte().add("10karakter");
        k3.getManifestacije().add("1");
        k3.getManifestacije().add("2");

        userDAO.dodajKorisnika(k1);
        userDAO.dodajKorisnika(k2);
        userDAO.dodajKorisnika(k3);
        userDAO.saveKorisnici();
    }
}
