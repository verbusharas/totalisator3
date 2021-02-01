package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.controller.dto.MatchDTO;
import lt.verbus.totalisator.service.MatchService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/totalisator/{totalisatorId}/match")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    private MatchDTO saveMatch(@RequestBody MatchDTO matchDTO) {
        return matchService.create(matchDTO);
    }

    @GetMapping
    private List<MatchDTO> getTotalisatorMatches(@PathVariable Long totalisatorId) {
        return matchService.getTotalisatorMatches(totalisatorId);
    }

    @GetMapping("/pending")
    private List<MatchDTO> getPendingMatches(@PathVariable Long totalisatorId) {
        List<MatchDTO> pending = matchService.findUpdatedByTotalisatorAndStatus(totalisatorId, "Notstarted");
        List<MatchDTO> inPlay = matchService.findUpdatedByTotalisatorAndStatus(totalisatorId, "Inplay");
        List<MatchDTO> notAnnounced = matchService.findUpdatedByTotalisatorAndStatus(totalisatorId, "Notannounced");
        pending.addAll(inPlay);
        pending.addAll(notAnnounced);
        return pending;
    }

    @PatchMapping("/{id}/update")
    private MatchDTO updateMatch(@PathVariable Long id) {
        return matchService.update(id);
    }

    @GetMapping("/finished")
    private List<MatchDTO> getFinishedMatches(@PathVariable Long totalisatorId) {
        return matchService.findUpdatedByTotalisatorAndStatus(totalisatorId, "Finished");
    }
}
