package controller;

import com.google.gson.Gson;
import model.Korisnik;
import model.Kupac;
import org.w3c.dom.ls.LSOutput;

import java.util.Date;

public class Main {
    public static void main(String[] args) {
        Date now = new Date();
        Kupac k = new Kupac(
                "username",
                "password",
                "ime",
                "prezime",
                "m",
                now
        );

        Gson g = new Gson();
        String kupac = g.toJson(k);
        Korisnik k1 = g.fromJson(kupac, Korisnik.class);
        Kupac k2 = (Kupac) k1;
        System.out.println("Done");
    }
}
