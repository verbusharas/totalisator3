package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.entity.Fixture;
import lt.verbus.totalisator.service.FixtureService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/fixture")
public class FixtureController {

    private final FixtureService fixtureService;

    public FixtureController(FixtureService fixtureService) {
        this.fixtureService = fixtureService;
    }

    @PostMapping
    private List<Fixture> saveAsTotalisatorFixtures(@RequestBody List<Fixture> fixtures) {
        return fixtureService.saveFixtures(fixtures);
    }

    @GetMapping
    private List<Fixture> getTotalisatorFixtures() {
        return fixtureService.getTotalisatorFixtures();
    }
}
