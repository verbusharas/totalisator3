package lt.verbus.totalisator.service;

import lt.verbus.totalisator.entity.Totalisator;
import lt.verbus.totalisator.entity.User;
import lt.verbus.totalisator.repository.TotalisatorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TotalisatorService {

    private final TotalisatorRepository totalisatorRepository;
    private final UserService userService;

    public TotalisatorService(TotalisatorRepository totalisatorRepository, UserService userService) {
        this.totalisatorRepository = totalisatorRepository;
        this.userService = userService;
    }

    public List<Totalisator> getAllTotalisators() {
        return totalisatorRepository.findAll();
    }

    public Totalisator save(Totalisator totalisator) {
        return totalisatorRepository.save(totalisator);
    }

    public Totalisator mockWithUserId(Long id) {
        User user = userService.getUserById(id);
        Totalisator totalisator = new Totalisator();
        totalisator.setTitle("PANDA TOTALIZATORIUS");
        totalisator.setPlayers(List.of(user));
        return totalisatorRepository.save(totalisator);
    }
}
