package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.controller.dto.MatchDTO;
import lt.verbus.totalisator.service.MatchService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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
        List<MatchDTO> pending = matchService.findByTotalisatorAndStatus(totalisatorId, "Notstarted");
        List<MatchDTO> inPlay = matchService.findByTotalisatorAndStatus(totalisatorId, "Inplay");
        List<MatchDTO> notAnnounced = matchService.findByTotalisatorAndStatus(totalisatorId, "Notannounced");
        pending.addAll(inPlay);
        pending.addAll(notAnnounced);
        return pending;
    }

    @GetMapping("/{matchId}")
    private MatchDTO getMatch(@PathVariable Long totalisatorId, @PathVariable Long matchId) {
        return matchService.getByTotalisatorIdAndMatchId(totalisatorId, matchId);
    }

    @GetMapping("/finished")
    private List<MatchDTO> getFinishedMatches(@PathVariable Long totalisatorId) {
        return matchService.findByTotalisatorAndStatus(totalisatorId, "Finished");
    }
}
