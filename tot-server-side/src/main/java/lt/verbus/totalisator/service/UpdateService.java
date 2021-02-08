package lt.verbus.totalisator.service;

import lt.verbus.totalisator.domain.entity.Match;
import lt.verbus.totalisator.integration.soccersapi.dto.FixtureUpdateDTO;
import lt.verbus.totalisator.util.UpdateQualifier;
import org.springframework.stereotype.Service;

@Service
public class UpdateService {

    public final FifaService fifaService;
    public final UpdateQualifier updateQualifier;

    public UpdateService(FifaService fifaService, UpdateQualifier updateQualifier) {
        this.fifaService = fifaService;
        this.updateQualifier = updateQualifier;
    }

    public Match updateIfMonitored(Match match) {
        if (updateQualifier.hasStartedOrIsAboutToStart(match)) {
            update(match);
        }
        return match;
    }

    public Match update(Match match) {
            updateStatusAndScores(match);
        return match;
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

}
