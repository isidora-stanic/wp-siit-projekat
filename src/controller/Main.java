package controller;

import DAO.CardDAO;
import DAO.ManifestationDAO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import model.*;

import java.io.*;
import java.util.ArrayList;
import java.util.Date;

import static spark.Spark.*;

public class Main {
    private static final ManifestationDAO manifestationDAO = new ManifestationDAO();
    private static final CardDAO cardDAO = new CardDAO();
    private static final Gson g = new Gson();

    public static void main(String[] args) throws IOException {
        manifestationDAO.loadManifestacije();
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

        cardDAO.loadKarte();
        get("/rest/karte", (req, res) -> {
            res.type("application/json");
            ArrayList<Karta> karte = cardDAO.getKarte();
            return g.toJson(cardDAO.getKarte());
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
}
