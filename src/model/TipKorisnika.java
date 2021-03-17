package model;

public class TipKorisnika {
    public enum Tip { BRONZE, SILVER, GOLD }

    public static Tip getTip(int brojBodova) {
        if (brojBodova < 3000)
            return Tip.BRONZE;
        if (brojBodova < 5000)
            return Tip.SILVER;
        return Tip.GOLD;
    }

    public static double getPopust(Tip tip) {
        switch (tip) {
            case SILVER:
                return 0.03;
            case GOLD:
                return 0.05;
            default:
                return 0;
        }
    }
}
