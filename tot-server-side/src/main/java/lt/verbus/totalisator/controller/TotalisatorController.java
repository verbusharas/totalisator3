package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.entity.Totalisator;
import lt.verbus.totalisator.entity.User;
import lt.verbus.totalisator.service.TotalisatorService;
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
    public List<Totalisator> getAllUsers() {
        return totalisatorService.getAllTotalisators();
    }

    @PostMapping("/mock/{id}")
    public Totalisator createTotalisatorWithUser(@PathVariable Long id) {
        return totalisatorService.mockWithUserId(id);
    }


    @PostMapping
    public Totalisator createTotalisator(@RequestBody Totalisator totalisator) {
        return totalisatorService.save(totalisator);
    }

}
