package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.entity.Totalisator;
import lt.verbus.totalisator.service.TotalisatorService;
import lt.verbus.totalisator.controller.dto.TotalisatorDTO;
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

    @GetMapping("player")
    public List<TotalisatorDTO> getAllTotalisatorsByUserId(@RequestParam Long id) {
        return totalisatorService.getAllTotalisatorsByUserId(id);
    }

    @GetMapping("/{id}")
    public TotalisatorDTO getTotalisatorById(@PathVariable Long id) {
        return totalisatorService.getTotalisatorById(id);
    }

    @PutMapping("/{totalisatorId}/invite/{playerId}")
    public TotalisatorDTO addPlayer(@PathVariable Long playerId, @PathVariable Long totalisatorId) {
        return totalisatorService.addUserByIdToTotalisatorById(playerId, totalisatorId);
    }

    @PostMapping
    public TotalisatorDTO createTotalisator(@RequestBody TotalisatorDTO totalisatorDTO) {
        return totalisatorService.save(totalisatorDTO);
    }

}
