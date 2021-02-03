package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.controller.dto.PayoutDTO;
import lt.verbus.totalisator.controller.dto.PredictionRegistrationDTO;
import lt.verbus.totalisator.controller.dto.PredictionDTO;
import lt.verbus.totalisator.service.PayoutService;
import lt.verbus.totalisator.service.PredictionService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/totalisator/prediction")
public class PredictionController {

    private final PredictionService predictionService;
    private final PayoutService payoutService;

    public PredictionController(PredictionService predictionService, PayoutService payoutService) {
        this.predictionService = predictionService;
        this.payoutService = payoutService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public PredictionDTO predict(@RequestBody PredictionRegistrationDTO predictionRegistrationDTO) {
        return predictionService
                .savePrediction(predictionRegistrationDTO);
    }

    @GetMapping("/payout/{matchId}")
    public List<PayoutDTO> calculateMatchPayouts(@PathVariable Long matchId) {
        return payoutService.calculateByMatch(matchId);
    }

    @GetMapping("/payout/all/{totalisatorId}")
    public List<PayoutDTO> calculateTotalisatorPayouts(@PathVariable Long totalisatorId) {
        return payoutService.calculateByTotalisator(totalisatorId);
    }

}
