package controller;

import DAO.ManifestationDAO;
import DAO.UserDAO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import model.*;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import static spark.Spark.*;

public class Main {
    private static final ManifestationDAO manifestationDAO = new ManifestationDAO();
    private static final UserDAO userDAO = new UserDAO();
    private static final Gson g = new Gson();

    public static void main(String[] args) throws IOException {
        manifestationDAO.loadManifestacije();
        userDAO.loadKorisnici();

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
                res.status(400);
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
                res.status(400);
                return null;
            }
            if (!k.getPassword().equals(password)) {
                res.status(400);
                return null;
            }

            return g.toJson(k);
        });

        post("/rest/add/manifestacija", (req, res) -> {
            HashMap<String, String> manifestationMap = g.fromJson(req.body(), HashMap.class);
            String ime = manifestationMap.get("ime");
            String tip = manifestationMap.get("tip");
            int ukupnoMesta = Integer.parseInt(manifestationMap.get("ukupnoMesta"));
            double cenaKarte = Double.parseDouble(manifestationMap.get("cenaKarte"));
            String ulicaIBroj = manifestationMap.get("ulicaIBroj");
            String mesto = manifestationMap.get("mesto");
            String postanskiBroj = manifestationMap.get("postanskiBroj");
            String slika = manifestationMap.get("slika");

            String vremeOdrzavanjaString = manifestationMap.get("vremeOdrzavanja");
            Date vremeOdrzavanja = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(vremeOdrzavanjaString);

            Adresa adresa = new Adresa(
                    ulicaIBroj,
                    mesto,
                    postanskiBroj
            );

            Lokacija lokacija = new Lokacija(22, 44, adresa);

            Manifestacija man = new Manifestacija(
                    manifestationDAO.generateID(),
                    ime,
                    tip,
                    ukupnoMesta,
                    vremeOdrzavanja,
                    cenaKarte,
                    lokacija,
                    slika
            );

            if (!manifestationDAO.ProveriDostupnost(man)) {
                res.status(400);
                return "Nije dostupno mesto u dato vreme";
            }

            String prodavacID = manifestationMap.get("prodavacID");
            Prodavac prodavac = (Prodavac) userDAO.getKorisnikByUsername(prodavacID);
            prodavac.getManifestacije().add(man.getID());

            manifestationDAO.dodajManifestaciju(man);
            manifestationDAO.saveManifestacije();
            userDAO.saveKorisnici();
            return "OK";
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

    public static void dumpUsers() throws IOException {
        Date date = new Date();
        Korisnik k1 = new Administrator("admin", "admin", "adminko", "adminic", "m", date);
        Korisnik k2 = new Kupac("matija", "m1234", "matija", "matovic", "m", date);
        Korisnik k3 = new Prodavac("prodavko", "p1234", "prodavomir", "prodic", "m", date);
        userDAO.dodajKorisnika(k1);
        userDAO.dodajKorisnika(k2);
        userDAO.dodajKorisnika(k3);
        userDAO.saveKorisnici();
    }
}
