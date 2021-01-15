package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.service.dto.FixturesResponse;
import lt.verbus.totalisator.service.FixtureService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fixture")
public class FixtureController {

    private final FixtureService fixtureService;

    public FixtureController(FixtureService fixtureService) {
        this.fixtureService = fixtureService;
    }

    @GetMapping
    private FixturesResponse getFixtures(@RequestParam String date) {
        return fixtureService.getFixturesByDate(date);
    }

}
