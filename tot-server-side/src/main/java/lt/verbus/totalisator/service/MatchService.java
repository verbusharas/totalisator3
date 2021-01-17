package lt.verbus.totalisator.service;

import lt.verbus.totalisator.entity.Match;
import lt.verbus.totalisator.repository.MatchRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchService {
    private final MatchRepository matchRepository;

    public MatchService(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    public Match saveMatch(Match match){
        return matchRepository.save(match);
    }

    public List<Match> getTotalisatorFixtures() {
        return matchRepository.findAll();
    }
}

