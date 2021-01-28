package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.entity.Totalisator;
import lt.verbus.totalisator.service.TotalisatorService;
import lt.verbus.totalisator.service.dto.TotalisatorDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/totalisator")
public class TotalisatorController {

    private final TotalisatorService totalisatorService;

    public TotalisatorController(TotalisatorService totalisatorService) {
        this.totalisatorService = totalisatorService;
    }

    @GetMapping
    public List<TotalisatorDTO> getAllTotalisators() {
        return totalisatorService.getAllTotalisators();
    }

    @PutMapping("/{totalisatorId}/invite/{playerId}")
    public TotalisatorDTO addPlayer(@PathVariable Long playerId, @PathVariable Long totalisatorId) {
        return totalisatorService.addUserByIdToTotalisatorById(playerId, totalisatorId);
    }

    @PostMapping
    public TotalisatorDTO createTotalisator(@RequestBody Totalisator totalisator) {
        return totalisatorService.save(totalisator);
    }

}
