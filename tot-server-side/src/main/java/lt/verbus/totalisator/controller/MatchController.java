package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.controller.dto.MatchDTO;
import lt.verbus.totalisator.domain.entity.User;
import lt.verbus.totalisator.service.MatchService;
import lt.verbus.totalisator.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/totalisator/{totalisatorId}/match")
public class MatchController {

    private final MatchService matchService;
    private final UserService userService;

    public MatchController(MatchService matchService, UserService userService) {
        this.matchService = matchService;
        this.userService = userService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MatchDTO saveMatch(@RequestBody MatchDTO matchDTO) {
        return matchService.add(matchDTO);
    }

    @GetMapping("/pending")
    private List<MatchDTO> getPendingMatches(@PathVariable Long totalisatorId) {
        return matchService.getPendingByTotalisatorId(totalisatorId);
    }

    @GetMapping("/finished")
    public List<MatchDTO> getFinishedMatches(@PathVariable Long totalisatorId) {
        return matchService.getFinishedByTotalisatorId(totalisatorId);
    }

    @GetMapping("/player/not-predicted/")
    private List<MatchDTO> getPlayerNotPredictedMatches(@PathVariable Long totalisatorId, @AuthenticationPrincipal User user) {
        return matchService.getNotPredictedByUserAndTotalisatorId(totalisatorId, user.getId());
    }

    @GetMapping("/player/pending")
    private List<MatchDTO> getPlayerPendingMatches(@PathVariable Long totalisatorId, @AuthenticationPrincipal User user) {
        return matchService.getPendingByUserAndTotalisatorId(totalisatorId, user.getId());
    }


}
