package lt.verbus.totalisator.service;


import lt.verbus.totalisator.integration.SoccersApi;
import lt.verbus.totalisator.service.dto.FixturesResponseDTO;
import org.springframework.stereotype.Service;




@Service
public class FifaFixtureService {
    private final SoccersApi soccersApi;


    public FifaFixtureService(SoccersApi soccersApi) {
        this.soccersApi = soccersApi;
    }

    public FixturesResponseDTO getFifaFixturesByDate(String date) {
        return soccersApi.getFixturesByDate(date);
    }

}