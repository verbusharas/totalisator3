package lt.verbus.totalisator.service;

import lt.verbus.totalisator.controller.dto.TotalisatorBasicDTO;
import lt.verbus.totalisator.controller.dto.UserDTO;
import lt.verbus.totalisator.domain.entity.Prediction;
import lt.verbus.totalisator.domain.entity.Totalisator;
import lt.verbus.totalisator.domain.entity.User;
import lt.verbus.totalisator.exception.DuplicateEntryException;
import lt.verbus.totalisator.exception.OperationNotAllowed;
import lt.verbus.totalisator.repository.TotalisatorRepository;
import lt.verbus.totalisator.controller.dto.TotalisatorDTO;
import lt.verbus.totalisator.util.mapper.TotalisatorMapper;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TotalisatorService {

    private final TotalisatorRepository totalisatorRepository;
    private final UserService userService;
    private final TotalisatorMapper totalisatorMapper;
    private final PredictionService predictionService;

    public TotalisatorService(TotalisatorRepository totalisatorRepository, UserService userService, TotalisatorMapper totalisatorMapper, PredictionService predictionService) {
        this.totalisatorRepository = totalisatorRepository;
        this.userService = userService;
        this.totalisatorMapper = totalisatorMapper;
        this.predictionService = predictionService;
    }

    public TotalisatorBasicDTO getBasicDTObyId(Long id) {
        return totalisatorMapper.convertToBasicDTO(totalisatorRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Totalisator was not found")));
    }

    protected Totalisator getById(Long id) {
        return totalisatorRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Totalisator Not Found"));
    }


    public TotalisatorBasicDTO save(TotalisatorDTO totalisatorDTO) {
        User manager = userService.getById(totalisatorDTO.getManagerId());
        Totalisator totalisator =  totalisatorMapper.convertTotalisatorDTOtoEntity(totalisatorDTO);
        totalisator.setManager(manager);
        totalisator.setPlayers(List.of(manager));
        Totalisator savedTotalisator = totalisatorRepository.save(totalisator);
        manager.getTotalisators().add(totalisator);
        return totalisatorMapper.convertToBasicDTO(savedTotalisator);
    }

    public List<UserDTO> getPlayers(Long id) {
        return userService.getByTotalisatorId(getById(id));
    }

    public TotalisatorDTO addPlayer (Long userId, Long totalisatorId) {
        User user = userService.getById(userId);
        Totalisator totalisator = totalisatorRepository.getOne(totalisatorId);

        if (isUserInTotalisator(user, totalisator)) {
            throw new DuplicateEntryException("Player already exists");
        }
        
        List<Prediction> defaultNewUserPredictions = predictionService.getDefaultPredictionList(totalisator, user);
        user.getPredictions().addAll(defaultNewUserPredictions);

        totalisator.getPlayers().add(user);
        Totalisator savedTotalisator = totalisatorRepository.save(totalisator);
        user.getTotalisators().add(totalisator);
        return totalisatorMapper.convertToDTO(savedTotalisator);
    }

    @Transactional
    public TotalisatorDTO kickPlayer(Long playerId, Long totalisatorId) {
        Totalisator totalisator = totalisatorRepository.getOne(totalisatorId);
        User manager = totalisator.getManager();
        if (playerId.equals(manager.getId())) {
            throw new OperationNotAllowed("Manager cannot be kicked.");
        }
        totalisator.setPlayers(totalisator
                .getPlayers()
                .stream()
                .filter(p-> !p.getId().equals(playerId))
                .collect(Collectors.toList()));
        Totalisator savedTotalisator = totalisatorRepository.save(totalisator);
        predictionService.deleteAllByUserAndTotalisatorId(playerId, totalisatorId);
        return totalisatorMapper.convertToDTO(savedTotalisator);
    }

    protected boolean isUserInTotalisator(User user, Totalisator totalisator) {
        return   user
                .getTotalisators()
                .stream()
                .anyMatch(tot-> tot.getId().equals(totalisator.getId()));
    }


}
