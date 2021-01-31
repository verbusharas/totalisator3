package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.integration.soccersapi.dto.FifaFixtureDTO;
import lt.verbus.totalisator.integration.soccersapi.dto.FixtureUpdateDTO;
import lt.verbus.totalisator.service.FifaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/fixture")
public class FIfaFixtureController {

    private final FifaService fifaService;

    public FIfaFixtureController(FifaService fifaService) {
        this.fifaService = fifaService;
    }

    @GetMapping("/{id}/update")
    private FixtureUpdateDTO getFixtureUpdate(@PathVariable Long id) {
        return fifaService.getFixtureUpdateById(id);
    }

    @GetMapping
    private List<FifaFixtureDTO> getFifaFixturesByDateNew(@RequestParam String date) {
        return fifaService.getFifaFixturesByDate(date);
    }


}
