package lt.verbus.totalisator.util;

import lt.verbus.totalisator.domain.entity.Match;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class UpdateQualifier {

    public static boolean hasStarted(Match match) {
        String dateString = match.getDate();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startsAt = LocalDateTime.parse(dateString, formatter);
        LocalDateTime now = LocalDateTime.now();
        return now.isAfter(startsAt) || match.getStatusName().equals("Inplay") || hasFinished(match);
    }


    public static boolean hasFinished(Match match) {
        return match.getStatusName().equals("Finished");
    }

}
