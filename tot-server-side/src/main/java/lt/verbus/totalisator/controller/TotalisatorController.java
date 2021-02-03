package lt.verbus.totalisator.controller;

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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TotalisatorDTO create(@RequestBody TotalisatorDTO totalisatorDTO) {
        return totalisatorService.save(totalisatorDTO);
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TotalisatorDTO update(@PathVariable Long id) {
        return totalisatorService.getUpdatedDTO(id);
    }

    @GetMapping("player")
    public List<TotalisatorDTO> getAllByUserId(@RequestParam Long id) {
        return totalisatorService.getAllByUserId(id);
    }

    @GetMapping("/{id}")
    public TotalisatorDTO getDTOByUserId(@PathVariable Long id) {
        return totalisatorService.getDTObyUserId(id);
    }


    @PutMapping("/{totalisatorId}/invite/{playerId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public TotalisatorDTO addPlayer(@PathVariable Long playerId, @PathVariable Long totalisatorId) {
        return totalisatorService.addUserByIdToTotalisatorById(playerId, totalisatorId);
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @DeleteMapping("/{totalisatorId}/kick/{playerId}")
    public TotalisatorDTO kickPlayer(@PathVariable Long playerId, @PathVariable Long totalisatorId) {
        return totalisatorService.kickPlayer(playerId, totalisatorId);
    }

}
