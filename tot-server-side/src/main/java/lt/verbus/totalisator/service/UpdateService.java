package lt.verbus.totalisator.service;

import lt.verbus.totalisator.entity.Match;
import lt.verbus.totalisator.integration.soccersapi.dto.FixtureUpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UpdateService {

public final FifaService fifaService;
public MatchService matchService;



    public UpdateService(FifaService fifaService) {
        this.fifaService = fifaService;
    }

    public List<Match> updateMatches(List<Match> matches) {
        return matches.stream()
                .peek(m ->  {
                    FixtureUpdateDTO update =
                            fifaService.getFixtureUpdateById(m.getFifaId());
                    if (update.getStatusName() != null) {
                        m.setStatusName(update.getStatusName());
                    } else {
                        m.setStatusName("Notannounced");
                    }

                    if (update.getAwayScore() != null && update.getHomeScore() != null) {
                        m.setHomeScore(Byte.valueOf(update.getHomeScore()));
                        m.setAwayScore(Byte.valueOf(update.getAwayScore()));
                    }
                    matchService.save(m);
                })
                .collect(Collectors.toList());
    }

    @Autowired
    public void setMatchService(MatchService matchService) {
        this.matchService = matchService;
    }

}
