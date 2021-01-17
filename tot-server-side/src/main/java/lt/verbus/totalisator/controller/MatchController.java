package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.entity.Match;
import lt.verbus.totalisator.service.MatchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/match")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @PostMapping
    private Match saveMatch(@RequestBody Match match) {
        return matchService.saveMatch(match);
    }

    @GetMapping
    private List<Match> getMatches() {
        return matchService.getTotalisatorFixtures();
    }
}
