package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.entity.Totalisator;
import lt.verbus.totalisator.service.TotalisatorService;
import lt.verbus.totalisator.controller.dto.TotalisatorDTO;
import org.springframework.http.HttpStatus;
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
    public TotalisatorDTO getTotalisatorDTOById(@PathVariable Long id) {
        return totalisatorService.getTotalisatorDTOById(id);
    }

    @GetMapping("/entity/{id}")
    public Long getTotalisatorById(@PathVariable Long id) {
        Totalisator totalisator = totalisatorService.getTotalisatorById(id);
        return totalisator.getId();
    }

    @PutMapping("/{totalisatorId}/invite/{playerId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public TotalisatorDTO addPlayer(@PathVariable Long playerId, @PathVariable Long totalisatorId) {
        return totalisatorService.addUserByIdToTotalisatorById(playerId, totalisatorId);
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @DeleteMapping("/{totalisatorId}/kick/{playerId}")
    public TotalisatorDTO kickPlayer(@PathVariable Long playerId, @PathVariable Long totalisatorId) {
        return totalisatorService.kickUserByIdFromTotalisatorById(playerId, totalisatorId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TotalisatorDTO createTotalisator(@RequestBody TotalisatorDTO totalisatorDTO) {
        return totalisatorService.save(totalisatorDTO);
    }

}
