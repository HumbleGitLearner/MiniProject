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
        DateTimeFormatter.ofPattern("dd MMM yy HH:mm Z", Locale.ENGLISH)
    };

    private static final DateTimeFormatter[] TIME_FORMATTERS = new DateTimeFormatter[]{
        DateTimeFormatter.ofPattern("HH:mm Z", Locale.ENGLISH),
        DateTimeFormatter.ISO_LOCAL_TIME,
        DateTimeFormatter.ofPattern("H:mm")
    };


    public static LocalDateTime parseDateTime(String date, String time) {
        LocalDate receiptDate = parseReceiptDate(date);
        LocalTime purchaseTime = parsePurchaseTime(time);
        return LocalDateTime.of(receiptDate, purchaseTime);
    }

    
    private static LocalDate parseReceiptDate(String dateStr) {
        for (DateTimeFormatter formatter : DATE_FORMATTERS) {
            try {
                return LocalDate.parse(dateStr, formatter);
            } catch (Exception ignored) {}
        }
        throw new IllegalArgumentException("Unknown date format: " + dateStr);
    }

    private static LocalTime parsePurchaseTime(String timeStr) {
        for (DateTimeFormatter formatter : TIME_FORMATTERS) {
            try {
                return LocalTime.parse(timeStr, formatter);
            } catch (Exception ignored) {}
        }
        throw new IllegalArgumentException("Unknown time format: " + timeStr);
    }
}
