package lt.verbus.totalisator.service;

import lt.verbus.totalisator.entity.Totalisator;
import lt.verbus.totalisator.entity.User;
import lt.verbus.totalisator.exception.OperationNotAllowed;
import lt.verbus.totalisator.repository.TotalisatorRepository;
import lt.verbus.totalisator.controller.dto.TotalisatorDTO;
import lt.verbus.totalisator.util.TotalisatorMapper;
import org.springframework.security.access.AccessDeniedException;
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

    public TotalisatorService(TotalisatorRepository totalisatorRepository, UserService userService, TotalisatorMapper totalisatorMapper) {
        this.totalisatorRepository = totalisatorRepository;
        this.userService = userService;
        this.totalisatorMapper = totalisatorMapper;
    }

    public List<TotalisatorDTO> getAllTotalisators() {
        return totalisatorRepository
                .findAll()
                .stream()
                .map(totalisatorMapper::convertTotalisatorEntityToDTO)
                .collect(Collectors.toList());
    }

    public List<TotalisatorDTO> getAllTotalisatorsByUserId(Long userId) {
        return totalisatorRepository
                .findAllByUserId(userId)
                .stream()
                .map(totalisatorMapper::convertTotalisatorEntityToDTO)
                .collect(Collectors.toList());
    }

    public TotalisatorDTO save(TotalisatorDTO totalisatorDTO) {
        User manager = userService.getUserById(totalisatorDTO.getManagerId());
        Totalisator totalisator =  totalisatorMapper.convertTotalisatorDTOtoEntity(totalisatorDTO);
        totalisator.setManager(manager);
        totalisator.setPlayers(List.of(manager));
        Totalisator savedTotalisator = totalisatorRepository.save(totalisator);
        manager.getTotalisators().add(totalisator);

        return totalisatorMapper.convertTotalisatorEntityToDTO(savedTotalisator);
    }

    public TotalisatorDTO addUserByIdToTotalisatorById(Long userId, Long totalisatorId) {
        User user = userService.getUserById(userId);
        Totalisator totalisator = totalisatorRepository.getOne(totalisatorId);
        boolean isUserInTotalisator = user
                .getTotalisators()
                .stream()
                .anyMatch(tot-> tot.getId().equals(totalisator.getId()));

        if (isUserInTotalisator) {
            return totalisatorMapper
                    .convertTotalisatorEntityToDTO(totalisator);
        }
        totalisator.getPlayers().add(user);
        Totalisator savedTotalisator = totalisatorRepository.save(totalisator);
        user.getTotalisators().add(totalisator);
        return totalisatorMapper.convertTotalisatorEntityToDTO(savedTotalisator);
    }

    public TotalisatorDTO getTotalisatorDTOById(Long id) {
        return totalisatorMapper.convertTotalisatorEntityToDTO(totalisatorRepository.getOne(id));
    }

    public Totalisator getTotalisatorById(Long id) {
        return totalisatorRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Totalisator Not Found"));
    }


    public TotalisatorDTO kickUserByIdFromTotalisatorById(Long playerId, Long totalisatorId) {
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
        return totalisatorMapper.convertTotalisatorEntityToDTO(savedTotalisator);
    }
}
