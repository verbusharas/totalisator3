package lt.verbus.totalisator.util;

import lt.verbus.totalisator.domain.entity.Match;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Component
public class UpdateQualifier {

    @Value("${minutes.to.match.when.start.monitoring}")
    private Integer MINUTES_TO_MATCH_WHEN_START_MONITORING;

    public boolean hasStarted(Match match) {
        String dateString = match.getDate();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startsAt = LocalDateTime.parse(dateString, formatter);
        LocalDateTime now = LocalDateTime.now();
        return now.isAfter(startsAt) || match.getStatusName().equals("Inplay") || hasFinished(match);
    }

    public boolean hasStartedOrIsAboutToStart(Match match) {
        String dateString = match.getDate();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startsAt = LocalDateTime.parse(dateString, formatter);
        LocalDateTime now = LocalDateTime.now();
        long difference = ChronoUnit.MINUTES.between(now, startsAt);
        boolean aboutToStart = difference <= MINUTES_TO_MATCH_WHEN_START_MONITORING;
        boolean started = match.getStatusName().equals("Inplay");
        boolean finished = match.getStatusName().equals("Finished");
        return (aboutToStart || started) && !finished;
    }


    public static boolean hasFinished(Match match) {
        return match.getStatusName().equals("Finished");
    }

}
