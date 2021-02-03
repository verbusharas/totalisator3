package lt.verbus.totalisator.service;

import lt.verbus.totalisator.domain.entity.Match;
import lt.verbus.totalisator.integration.soccersapi.dto.FixtureUpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

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

        if (isMonitored(match)) {
            updateStatusAndScores(match);
        }
        return match;
    }

    private boolean isMonitored(Match match) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startsAt = LocalDateTime.parse(match.getDate(), formatter);
        LocalDateTime now = LocalDateTime.now();
        long difference = ChronoUnit.MINUTES.between(now, startsAt);
        boolean startsSoon = difference <= Integer.parseInt(MINUTES_TO_MATCH_WHEN_START_MONITORING);
        boolean started = match.getStatusName().equals("Inplay");
        boolean finished = match.getStatusName().equals("Finished");
        return ( ( started || startsSoon ) && !finished);
    }

    private void updateStatusAndScores (Match match) {
        FixtureUpdateDTO update = fifaService
                .getFixtureUpdateById(match.getFifaId());
        if (update.getStatusName() != null) {
            match.setStatusName(update.getStatusName());
        } else {
            match.setStatusName("Notannounced");
        }
        if (update.getAwayScore() != null && update.getHomeScore() != null) {
            match.setHomeScore(Integer.parseInt(update.getHomeScore()));
            match.setAwayScore(Integer.parseInt(update.getAwayScore()));
        }
    }


    @Autowired
    public void setMatchService(MatchService matchService) {
        this.matchService = matchService;
    }

    @Autowired
    public void setPredictionService(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

}
