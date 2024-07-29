package nus.mini.backend.utilities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.ResolverStyle;
import java.time.temporal.ChronoField;
import java.util.Locale;

public class DateTimeParser {

    private static final DateTimeFormatter[] DATE_FORMATTERS = new DateTimeFormatter[]{
        new DateTimeFormatterBuilder().appendPattern("dd/MM/yy")
            .parseDefaulting(ChronoField.YEAR_OF_ERA, LocalDate.now().getYear())
            .toFormatter().withResolverStyle(ResolverStyle.STRICT),
        DateTimeFormatter.ISO_LOCAL_DATE,
        DateTimeFormatter.ofPattern("MMMM d, yyyy", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("dd MMM yy HH:mm Z", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("MM/dd/yyyy", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("MM-dd-yyyy", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("dd MMM yyyy", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("d MMM yyyy", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("d MMMM yyyy", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("yyyy/MM/dd", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("yyyy.MM.dd", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("dd/MM/yy", Locale.ENGLISH),
    };

    private static final DateTimeFormatter[] TIME_FORMATTERS = new DateTimeFormatter[]{
        DateTimeFormatter.ofPattern("h:mm a", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("hh:mm a", Locale.ENGLISH),  
        DateTimeFormatter.ofPattern("H:mm"),
        DateTimeFormatter.ISO_LOCAL_TIME,
        DateTimeFormatter.ofPattern("HH:mm Z", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("HH:mm:ss", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("HH:mm:ss.SSS", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("h:mm:ss a", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("hh:mm:ss a", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("HH:mm:ss Z", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("HH:mm:ss.SSS Z", Locale.ENGLISH)
    };


    public static LocalDateTime parseDateTime(String date, String time) {
        System.out.println("parseDateTime1: "+date+" "+time);
        LocalDate receiptDate = parseReceiptDate(date);
        System.out.println("parseDateTime2: "+receiptDate.toString());
        LocalTime purchaseTime = parsePurchaseTime(time);
        System.out.println("parseDateTime3: "+LocalDateTime.of(receiptDate, purchaseTime).toString());
        return LocalDateTime.of(receiptDate, purchaseTime);
    }

    
    private static LocalDate parseReceiptDate(String dateStr) {
        for (DateTimeFormatter formatter : DATE_FORMATTERS) {
            try {
                LocalDate date = LocalDate.parse(dateStr, formatter);
                System.out.println("parseReceiptDate: " + date.toString());
                return date;
            } catch (Exception ignored) {}
        }
        throw new IllegalArgumentException("Unknown date format: " + dateStr);
    }

    private static LocalTime parsePurchaseTime(String timeStr) {
        for (DateTimeFormatter formatter : TIME_FORMATTERS) {
            try {
                LocalTime time = LocalTime.parse(timeStr, formatter);
                System.out.println("parseReceiptTime: "+ time.toString());          
                return time;
            } catch (Exception ignored) { }
        }
        throw new IllegalArgumentException("Unknown time format: " + timeStr);
    }
}
