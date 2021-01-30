package lt.verbus.totalisator.service;

import lt.verbus.totalisator.controller.dto.MatchDTO;
import lt.verbus.totalisator.controller.dto.TotalisatorDTO;
import lt.verbus.totalisator.entity.Match;
import lt.verbus.totalisator.entity.Totalisator;
import lt.verbus.totalisator.exception.DuplicateEntryException;
import lt.verbus.totalisator.repository.MatchRepository;
import lt.verbus.totalisator.util.MatchMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
        boolean isUnique = totalisator
                .getMatches()
                .stream()
                .noneMatch(match -> match
                        .getFifaId()
                        .equals(matchDTO.getFifaId()));
        if (isUnique) {
            Match match = matchMapper.convertMatchDTOtoEntity(matchDTO);
            match.setTotalisator(totalisator);
            Match savedMatch = matchRepository.save(match);
            return matchMapper.convertMatchEntityToMatchDTO(savedMatch);
        } else throw new DuplicateEntryException("Totalisator already contains this match");
    }

    public List<MatchDTO> getTotalisatorMatches(Long totalisatorId) {
        return matchRepository
                .findByTotalisatorId(totalisatorId)
                .stream()
                .map(matchMapper::convertMatchEntityToMatchDTO)
                .collect(Collectors.toList());
    }

    public List<MatchDTO> getPendingMatches(Long totalisatorId) {
        return matchRepository
                .findByTotalisatorIdAndStatusName(totalisatorId, "Notstarted")
                .stream()
                .map(matchMapper::convertMatchEntityToMatchDTO)
                .collect(Collectors.toList());
    }

    public List<MatchDTO> getFinishedMatches(Long totalisatorId) {
        return matchRepository
                .findByTotalisatorIdAndStatusName(totalisatorId, "Finished")
                .stream()
                .map(matchMapper::convertMatchEntityToMatchDTO)
                .collect(Collectors.toList());
    }

    public MatchDTO getByTotalisatorIdAndMatchId(Long totalisatorId, Long matchId) {
        Match match = matchRepository.findByTotalisatorIdAndMatchId(totalisatorId,matchId);
        return matchMapper.convertMatchEntityToMatchDTO(match);
    }
}

