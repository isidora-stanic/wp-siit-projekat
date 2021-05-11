package controller;

import DAO.CardDAO;
import DAO.CommentDAO;
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
    private static final CommentDAO commentDAO = new CommentDAO();
    private static final Gson g = new Gson();

    public static void main(String[] args) throws IOException {
        manifestationDAO.loadManifestacije();
        userDAO.loadKorisnici();
        cardDAO.loadKarte();
        commentDAO.loadKomentari();

        staticFiles.externalLocation(new File("./static").getCanonicalPath());
        port(8080);

        /* GET METODE */
        /* =========================================================================== */
        /* =========================================================================== */
        /* =========================================================================== */

        get("/rest/manifestacije", (req, res) -> {
           res.type("application/json");
           return g.toJson(manifestationDAO.getManifestacije());
        });

        get("/rest/manifestacije-prodavca/:username", (req, res) -> {
           Prodavac prodavac = (Prodavac) userDAO.getKorisnikByUsername(req.params(":username"));
           ArrayList<Manifestacija> manifestacije = new ArrayList<>();
           for (String manifestacijaID : prodavac.getManifestacije()) {
               manifestacije.add(manifestationDAO.getManifestacijaByID(manifestacijaID));
           }
           res.type("application/json");
           return g.toJson(manifestacije);
        });

        get("/rest/manifestacija/:id", (req, res) -> {
            Manifestacija m = manifestationDAO.getManifestacijaByID(req.params(":id"));

            if (m == null) {
                res.status(404);
                return "Manifestation with given ID not found";
            }

            //TODO: Dodati da vraca null i ako je m.obrisana() == ture
            //TODO: Dodati da vraca null i ako je status == 'ODBIJENA'
            //TODO: DODATI POLJE boolean obrisana U MANIFESTACIJU

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

        get("/rest/kupci/:manifestacijaID", (req, res) -> {
            Manifestacija man = manifestationDAO.getManifestacijaByID(req.params(":manifestacijaID"));
            ArrayList<Kupac> kupciKarata = new ArrayList<>();
            for (Korisnik u : userDAO.getKorisnici()) {
                if (u.getUloga() == Korisnik.Uloga.KUPAC) {
                    Kupac kupac = (Kupac) u;
                    if (kupac.isKorisnikBlokiran() || !kupac.isKorisnikAktivan())
                        continue;
                    for (String kartaID : kupac.getKupljeneKarte()) {
                        Karta karta = cardDAO.getKartaByID(kartaID);
                        if (!karta.isObrisan() && karta.getStatus() == Karta.Status.REZERVISANO &&
                                karta.getManifestacijaID().equals(man.getID())) {
                            if (!kupciKarata.contains(kupac))
                                kupciKarata.add(kupac);
                        }
                    }
                }
            }
            res.type("application/json");
            return g.toJson(kupciKarata);
        });

        get("/rest/comments/:manifestationID", (req, res) -> {
           res.type("application/json");
           String manifestationID = req.params(":manifestationID");
           return g.toJson(commentDAO.getKomentariByManifestacija(manifestationID));
        });

        /* POST METODE */
        /* =========================================================================== */
        /* =========================================================================== */
        /* =========================================================================== */

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
            if (k.isKorisnikBlokiran() || !k.isKorisnikAktivan()) {
                res.status(400);
                return null;
            }
            return g.toJson(k);
        });

        post("/rest/kupovina", (req, res) -> {
            HashMap<String, String> userMap = g.fromJson(req.body(), HashMap.class);
          
            String tip = userMap.get("tip");
            String manifestacijaID = userMap.get("manifestacijaID");
            String kolicina = userMap.get("kolicina");
            String cena = String.valueOf(userMap.get("cena"));
            String imeKupca = userMap.get("imeKupca");
            String username = userMap.get("username");

            Manifestacija m = manifestationDAO.getManifestacijaByID(manifestacijaID);
            m.setProdatoKarata(m.getProdatoKarata() + Integer.parseInt(kolicina));

            Karta.Tip tipKarte;
            if (tip.equals("REGULAR")) tipKarte = Karta.Tip.REGULAR;
            else if (tip.equals("FAN_PIT")) tipKarte = Karta.Tip.FAN_PIT;
            else tipKarte = Karta.Tip.VIP;

            Kupac k = (Kupac) userDAO.getKorisnikByUsername(username);

            int kolicinaKupljenihKarata = Integer.parseInt(kolicina);
            for (int i = 0; i < kolicinaKupljenihKarata; i++) {
                String newID = cardDAO.generateID();
                Karta novaKarta = new Karta(newID, manifestacijaID, m.getVremeOdrzavanja(), Double.parseDouble(cena)/kolicinaKupljenihKarata, imeKupca, tipKarte);
                cardDAO.dodajKartu(novaKarta);

                k.getKupljeneKarte().add(newID);
                int brojBodova = (int) (novaKarta.getCena()/1000 * 133);
                k.setSakupljenihPoena(k.getSakupljenihPoena() + brojBodova);
            }

            cardDAO.saveKarte();
            manifestationDAO.saveManifestacije();
            userDAO.saveKorisnici();

            return g.toJson(m);
        });

        post("/rest/otkazivanje", (req, res) -> {
            HashMap<String, String> userMap = g.fromJson(req.body(), HashMap.class);
            String id = userMap.get("id");
            String username = userMap.get("username");

            Karta karta = cardDAO.getKartaByID(id);
            Kupac k = (Kupac) userDAO.getKorisnikByUsername(username);

            Manifestacija m = manifestationDAO.getManifestacijaByID(karta.getManifestacijaID());
            m.setProdatoKarata(m.getProdatoKarata() - 1);

            int brojIzgubljenihBodova = (int) (karta.getCena()/1000 * 133 * 4);

            karta.setStatus(Karta.Status.OTKAZANO);
            //k.getKupljeneKarte().remove(karta.getID());
            k.setSakupljenihPoena(k.getSakupljenihPoena() - brojIzgubljenihBodova);

            cardDAO.saveKarte();
            manifestationDAO.saveManifestacije();
            userDAO.saveKorisnici();

            return g.toJson(m);
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

        post("/rest/comment/post", (req, res) -> {
            HashMap<String, String> commentMap = g.fromJson(req.body(), HashMap.class);

            String manifestacijaID = commentMap.get("manifestacijaID");
            Manifestacija man = manifestationDAO.getManifestacijaByID(manifestacijaID);
            if (man.getVremeOdrzavanja().after(new Date())) {
                res.status(400);
                return "Manifestacija još nije završena";
            }

            String kupacUsername = commentMap.get("username");
            Kupac k = (Kupac) userDAO.getKorisnikByUsername(kupacUsername);
            boolean imaRezervaciju = false;
            for (String kartaID : k.getKupljeneKarte()) {
                Karta karta = cardDAO.getKartaByID(kartaID);
                if (karta.getManifestacijaID().equals(man.getID())) {
                    if (!karta.isObrisan() && karta.getStatus() == Karta.Status.REZERVISANO)
                        imaRezervaciju = true;
                }
            }
            if (!imaRezervaciju) {
                res.status(400);
                return "Nemate rezervisanu kartu za ovu manifestaciju";
            }

            String tekstKomentara = commentMap.get("tekst");
            int ocena = Integer.parseInt(commentMap.get("ocena"));

            Komentar komentar = new Komentar(
                    commentDAO.generateID(),
                    kupacUsername,
                    manifestacijaID,
                    tekstKomentara,
                    ocena
            );

            commentDAO.dodajKomentar(komentar);
            commentDAO.saveKomentari();
            res.status(200);
            return "OK";
        });



        /* PUT METODE */
        /* =========================================================================== */
        /* =========================================================================== */
        /* =========================================================================== */

        put("/rest/edit/manifestacija", (req, res) -> {
            HashMap<String, String> manifestationMap = g.fromJson(req.body(), HashMap.class);
            String id = manifestationMap.get("id");

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

            Manifestacija man = manifestationDAO.getManifestacijaByID(id);

            man.setIme(ime);
            man.setTip(tip);
            man.setUkupnoMesta(ukupnoMesta);
            man.setCenaKarte(cenaKarte);
            man.setVremeOdrzavanja(vremeOdrzavanja);

            man.getLokacija().getAdresa().setUlicaIBroj(ulicaIBroj);
            man.getLokacija().getAdresa().setMesto(mesto);
            man.getLokacija().getAdresa().setPostanskiBroj(postanskiBroj);

            if (!manifestationDAO.ProveriDostupnost(man)) {
                res.status(400);
                return "Lokacija nije slobodna u dato vreme";
            }

            for (Karta k : cardDAO.getKarte()) {
                if (k.getManifestacijaID().equals(man.getID())) {
                    k.setDatumManifestacije(man.getVremeOdrzavanja());
                }
            }

            manifestationDAO.saveManifestacije();
            cardDAO.saveKarte();
            return "OK";
        });

        put("/rest/edit/:username", (req, res) -> {
           HashMap<String, String> newValueMap = g.fromJson(req.body(), HashMap.class);
           String attribute = newValueMap.get("attribute");
           String newValue = newValueMap.get("value");
           String username = req.params(":username");
           Korisnik k = userDAO.getKorisnikByUsername(username);
           switch (attribute) {
               case "ime":
                   k.setIme(newValue);
                   break;
               case "prezime":
                   k.setPrezime(newValue);
                   break;
               case "password":
                   k.setPassword(newValue);
                   break;
               case "datumRodjenja":
                   Date newDate = new SimpleDateFormat("yyyy-MM-dd").parse(newValue);
                   k.setDatumRodjenja(newDate);
                   break;
               default:
                   res.status(400);
                   return "Nepravilan naziv atributa";
           }
           userDAO.saveKorisnici();
           res.status(200);
           return "OK";
        });

        put("rest/comment/accept", (req, res) -> {
            HashMap<String, String> commentMap = g.fromJson(req.body(), HashMap.class);
            String commentID = commentMap.get("commentID");
            Komentar komentar = commentDAO.getKomentarByID(commentID);
            komentar.setPrihvacenoOdProdavca(true);
            commentDAO.saveKomentari();
            return "OK";
        });
    }

    public static void dumpManifestations() throws IOException {
        Adresa adresa = new Adresa("Heroja Jerkovica 37", "Uzice", "31000");
        Lokacija lok = new Lokacija(25, 35, adresa);
        Date date = new Date();

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
        Korisnik k1 = new Administrator("admin", "admin", "adminko", "adminic", "m", date);
        Korisnik k2 = new Kupac("matija", "m1234", "matija", "matovic", "m", date);
        Korisnik k3 = new Prodavac("prodavko", "p1234", "prodavomir", "prodic", "m", date);

        userDAO.dodajKorisnika(k1);
        userDAO.dodajKorisnika(k2);
        userDAO.dodajKorisnika(k3);
        userDAO.saveKorisnici();
    }
}
