package lt.verbus.totalisator.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateEvaluator {

    public static boolean hasStarted(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startsAt = LocalDateTime.parse(date, formatter);
        LocalDateTime now = LocalDateTime.now();
        return now.isAfter(startsAt);
    }

}
