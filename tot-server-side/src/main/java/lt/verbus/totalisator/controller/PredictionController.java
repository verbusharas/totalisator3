package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.controller.dto.PredictionRegistrationDTO;
import lt.verbus.totalisator.controller.dto.PredictionDTO;
import lt.verbus.totalisator.service.PredictionService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/totalisator/predict")
public class PredictionController {


    private final PredictionService predictionService;

    public PredictionController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public PredictionDTO predict(@RequestBody PredictionRegistrationDTO predictionRegistrationDTO) {

        return predictionService
                .savePrediction(predictionRegistrationDTO);
    }

}
