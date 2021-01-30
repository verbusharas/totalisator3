package lt.verbus.totalisator.service;

import lt.verbus.totalisator.controller.dto.MatchDTO;
import lt.verbus.totalisator.controller.dto.TotalisatorDTO;
import lt.verbus.totalisator.entity.Match;
import lt.verbus.totalisator.entity.Totalisator;
import lt.verbus.totalisator.repository.MatchRepository;
import lt.verbus.totalisator.repository.TotalisatorRepository;
import lt.verbus.totalisator.util.MatchMapper;
import lt.verbus.totalisator.util.TotalisatorMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchService {
    private final MatchRepository matchRepository;
    private final MatchMapper matchMapper;
    private final TotalisatorService totalisatorService;


    public MatchService(MatchRepository matchRepository, MatchMapper matchMapper, TotalisatorService totalisatorService) {
        this.matchRepository = matchRepository;
        this.matchMapper = matchMapper;
        this.totalisatorService = totalisatorService;
    }

    public MatchDTO saveMatch(MatchDTO matchDTO) {
        Totalisator totalisator = totalisatorService.getTotalisatorById(matchDTO.getTotalisatorId());
        Match match = matchMapper.convertMatchDTOtoEntity(matchDTO);
        match.setTotalisator(totalisator);
        Match savedMatch = matchRepository.save(match);
        return matchMapper.convertMatchEntityToMatchDTO(savedMatch);
    }

    public List<Match> getTotalisatorFixtures() {
        return matchRepository.findAll();
    }

    public List<Match> getPendingMatches() {
        return matchRepository.findMatchesByStatusName("Notstarted");
    }

    public List<Match> getFinishedMatches() {
        return matchRepository.findMatchesByStatusName("Finished");
    }

}

