package nus.mini.backend.models;

public class EnumTypes {
    public enum LoginType {
        LOCAL, GOOGLE, GITHUB, HOTMAIL
    }

    public enum CatType {
        OUTFOOD, GROCERY, TRANSPORT, EDUCATION, CLOTHING, 
                ENTERTAINMENT, HEALTH, APPLIANCES, OTHER
    }

    public enum PltfmType {
        GRAB, NTUC, FOODPANDA, DELIVEROO, SHOPEE, LAZADA, AMAZON, QOO10, CAROUSELL, OTHER
    }

     public enum PmtsType {
        CASH, CREDIT, DEBIT, PAYNOW, PAYLAH, PAYPAL, GOOGLEPAY, APPLEPAY, OTHER
    }

    public static CatType getCategoryFromString(String categoryStr) {
        return CatType.valueOf(categoryStr.toUpperCase());
    }
    public static PltfmType getPltfmTypeFromString(String pltfmStr) {
        return PltfmType.valueOf(pltfmStr.toUpperCase());
    }

    public static PmtsType getPmtTypeFromString(String paymentStr) {
        return PmtsType.valueOf(paymentStr.toUpperCase());
    }
    
}
