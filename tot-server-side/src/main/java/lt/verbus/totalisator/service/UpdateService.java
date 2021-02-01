package lt.verbus.totalisator.service;

import lt.verbus.totalisator.entity.Match;
import lt.verbus.totalisator.integration.soccersapi.dto.FixtureUpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UpdateService {

    public final FifaService fifaService;
    public MatchService matchService;
    public PredictionService predictionService;

    @Value("${minutes.to.match.when.start.monitoring}")
    private String MINUTES_TO_MATCH_WHEN_START_MONITORING;

    public UpdateService(FifaService fifaService) {
        this.fifaService = fifaService;
    }

    public Match updateIfMonitored(Match match) {

        predictionService.defaultMissingPredictionsIfDue(match);

        if (isMonitored(match)) {
            FixtureUpdateDTO update =
                    fifaService.getFixtureUpdateById(match.getFifaId());
            if (update.getStatusName() != null) {
                match.setStatusName(update.getStatusName());
            } else {
                match.setStatusName("Notannounced");
            }
            if (update.getAwayScore() != null && update.getHomeScore() != null) {
                match.setHomeScore(Byte.valueOf(update.getHomeScore()));
                match.setAwayScore(Byte.valueOf(update.getAwayScore()));
            }
//                        matchService.save(match);
        }
        return match;
    }

    @Autowired
    public void setMatchService(MatchService matchService) {
        this.matchService = matchService;
    }

    @Autowired
    public void setPredictionService(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    public boolean isMonitored(Match match) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startsAt = LocalDateTime.parse(match.getDate(), formatter);
        LocalDateTime now = LocalDateTime.now();
        long difference = ChronoUnit.MINUTES.between(now, startsAt);
        return (difference <= Integer.parseInt(MINUTES_TO_MATCH_WHEN_START_MONITORING) && !match.getStatusName().equals("Finished"));
    }

}
