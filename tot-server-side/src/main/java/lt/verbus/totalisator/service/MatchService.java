package lt.verbus.totalisator.service;

import lt.verbus.totalisator.controller.dto.MatchDTO;
import lt.verbus.totalisator.domain.entity.Match;
import lt.verbus.totalisator.domain.entity.Totalisator;
import lt.verbus.totalisator.exception.DuplicateEntryException;
import lt.verbus.totalisator.repository.MatchRepository;
import lt.verbus.totalisator.util.MatchMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchService {
    private final MatchRepository matchRepository;
    private final MatchMapper matchMapper;
    private TotalisatorService totalisatorService;
    private UpdateService updateService;
    private PredictionService predictionService;
    private PayoutService payoutService;


    public MatchService(MatchRepository matchRepository, MatchMapper matchMapper) {
        this.matchRepository = matchRepository;
        this.matchMapper = matchMapper;
    }

    public MatchDTO add(MatchDTO matchDTO) {
        Totalisator totalisator = totalisatorService.getById(matchDTO.getTotalisatorId());
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
            return matchMapper.mapEntityToDTO(savedMatch);
        } else throw new DuplicateEntryException("Totalisator already contains this match");
    }

//    public Match save(Match match) {
//        return matchRepository.save(match);
//    }


    public List<MatchDTO> getAllByTotalisatorId(Long totalisatorId) {
        return matchRepository
                .findByTotalisatorId(totalisatorId)
                .stream()
                .map(matchMapper::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    public List<MatchDTO> getPendingByTotalisatorId(Long totalisatorId) {
        return matchRepository
                .findPendingByTotalisatorId(totalisatorId)
                .stream()
                .map(matchMapper::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    public List<MatchDTO> getFinishedByTotalisatorId(Long totalisatorId) {
        return matchRepository
                .findFinishedByTotalisatorId(totalisatorId)
                .stream()
                .map(matchMapper::mapEntityToDTO)
                .collect(Collectors.toList());
    }

//    public List<MatchDTO> findUpdatedByTotalisatorAndStatus(Long totalisatorId, String statusName) {
//        return findAndUpdateByTotalisatorId(totalisatorId).stream()
//                .filter(m->m.getStatusName().equals(statusName))
//                .map(matchMapper::mapEntityToDTO)
//                .collect(Collectors.toList());
//    }

//    public MatchDTO update(Long id) {
//      Match match = matchRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Match was not found"));
//      match = updateService.updateIfMonitored(match);
//      return matchMapper.mapEntityToDTO(matchRepository.save(match));
//    }

    public Match getById(Long id) {
        return matchRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Match was not found"));
    }

    public List<Match> getUpdates(List<Match> matches) {
        List<Match> updatedMatches = matches.stream()
                        .map(updateService::updateIfMonitored)
                        .map(predictionService::defaultMissingIfDue)
//                        .map(match -> payoutService.calculatePayouts())
                        .collect(Collectors.toList());
        return matchRepository.saveAll(updatedMatches);
    }

    @Autowired
    public void setUpdateService(UpdateService updateService) {
        this.updateService = updateService;
    }

    @Autowired
    public void setTotalisatorService(TotalisatorService totalisatorService) {
        this.totalisatorService = totalisatorService;
    }

    @Autowired
    public void setPredictionService(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @Autowired
    public void setPayoutService(PayoutService payoutService) {
        this.payoutService = payoutService;
    }


}

