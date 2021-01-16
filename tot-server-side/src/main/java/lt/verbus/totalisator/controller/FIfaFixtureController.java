package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.service.dto.FixturesResponseDTO;
import lt.verbus.totalisator.service.FifaFixtureService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fixture/fifa")
public class FIfaFixtureController {

    private final FifaFixtureService fifaFixtureService;

    public FIfaFixtureController(FifaFixtureService fifaFixtureService) {
        this.fifaFixtureService = fifaFixtureService;
    }

    @GetMapping
    private FixturesResponseDTO getFifaFixturesByDate(@RequestParam String date) {
        return fifaFixtureService.getFifaFixturesByDate(date);
    }



}
