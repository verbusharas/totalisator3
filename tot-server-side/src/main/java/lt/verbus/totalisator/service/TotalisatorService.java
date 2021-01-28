package lt.verbus.totalisator.service;

import lt.verbus.totalisator.entity.Totalisator;
import lt.verbus.totalisator.entity.User;
import lt.verbus.totalisator.repository.TotalisatorRepository;
import lt.verbus.totalisator.service.dto.TotalisatorDTO;
import lt.verbus.totalisator.util.TotalisatorMapper;
import org.springframework.stereotype.Service;

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

    public TotalisatorDTO save(Totalisator totalisator) {
        Totalisator savedTotalisator = totalisatorRepository.save(totalisator);
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

        user.getTotalisators().add(totalisator);
        totalisator.getPlayers().add(user);
        return save(totalisator);
    }
}
