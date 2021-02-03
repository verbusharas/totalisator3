package lt.verbus.totalisator.service;

import lt.verbus.totalisator.domain.entity.Match;
import lt.verbus.totalisator.domain.entity.Totalisator;
import lt.verbus.totalisator.domain.entity.User;
import lt.verbus.totalisator.exception.OperationNotAllowed;
import lt.verbus.totalisator.repository.TotalisatorRepository;
import lt.verbus.totalisator.controller.dto.TotalisatorDTO;
import lt.verbus.totalisator.util.TotalisatorMapper;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TotalisatorService {

    private final TotalisatorRepository totalisatorRepository;
    private final UserService userService;
    private final TotalisatorMapper totalisatorMapper;
    private final MatchService matchService;
    private final UpdateService updateService;

    public TotalisatorService(TotalisatorRepository totalisatorRepository, UserService userService, TotalisatorMapper totalisatorMapper, MatchService matchService, UpdateService updateService) {
        this.totalisatorRepository = totalisatorRepository;
        this.userService = userService;
        this.totalisatorMapper = totalisatorMapper;
        this.matchService = matchService;
        this.updateService = updateService;
    }

//    public List<TotalisatorDTO> getAllTotalisators() {
//        return totalisatorRepository
//                .findAll()
//                .stream()
//                .map(totalisatorMapper::convertToDTO)
//                .collect(Collectors.toList());
//    }

    public List<TotalisatorDTO> getAllByUserId(Long userId) {
        return totalisatorRepository
                .findAllByUserId(userId)
                .stream()
                .map(totalisatorMapper::convertToDTO)
                .collect(Collectors.toList());
    }

    public TotalisatorDTO save(TotalisatorDTO totalisatorDTO) {
        User manager = userService.getById(totalisatorDTO.getManagerId());
        Totalisator totalisator =  totalisatorMapper.convertTotalisatorDTOtoEntity(totalisatorDTO);
        totalisator.setManager(manager);
        totalisator.setPlayers(List.of(manager));
        Totalisator savedTotalisator = totalisatorRepository.save(totalisator);
        manager.getTotalisators().add(totalisator);

        return totalisatorMapper.convertToDTO(savedTotalisator);
    }

    public TotalisatorDTO addUserByIdToTotalisatorById(Long userId, Long totalisatorId) {
        User user = userService.getById(userId);
        Totalisator totalisator = totalisatorRepository.getOne(totalisatorId);
        boolean isUserInTotalisator = user
                .getTotalisators()
                .stream()
                .anyMatch(tot-> tot.getId().equals(totalisator.getId()));

        if (isUserInTotalisator) {
            return totalisatorMapper
                    .convertToDTO(totalisator);
        }
        totalisator.getPlayers().add(user);
        Totalisator savedTotalisator = totalisatorRepository.save(totalisator);
        user.getTotalisators().add(totalisator);
        return totalisatorMapper.convertToDTO(savedTotalisator);
    }

    public TotalisatorDTO getDTObyUserId(Long id) {

        return totalisatorMapper.convertToDTO(totalisatorRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Totalisator was not found")));
    }

    public TotalisatorDTO getUpdatedDTO(Long id) {
        Totalisator totalisator = getById(id);
        List<Match> matches = totalisator.getMatches();
        List<Match> updatedMatches = matchService.getUpdates(matches);
        totalisator.setMatches(updatedMatches);
        return totalisatorMapper.convertToDTO(totalisator);
    }

    public Totalisator getById(Long id) {
        return totalisatorRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Totalisator Not Found"));
    }

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
        return totalisatorMapper.convertToDTO(savedTotalisator);
    }
}
