package lt.verbus.totalisator.service;

import lt.verbus.totalisator.integration.SoccersApi;
import lt.verbus.totalisator.service.dto.FixturesResponse;
import org.springframework.stereotype.Service;


@Service
public class FixtureService {
    private final SoccersApi soccersApi;

    public FixtureService(SoccersApi soccersApi) {
        this.soccersApi = soccersApi;
    }

    public FixturesResponse getFixturesByDate(String date) {
        return soccersApi.getFixturesByDate(date);
    }

}