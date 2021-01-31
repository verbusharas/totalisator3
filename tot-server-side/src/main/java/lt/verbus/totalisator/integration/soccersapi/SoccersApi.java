package lt.verbus.totalisator.integration.soccersapi;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class SoccersApi {

    @Value("${soccersapi.fixture.by.id.url}")
    private String fixtureByIdUrl;

    @Value("${soccersapi.fixture.by.date.url}")
    private String fixtureByDateURL;

    private final RestTemplateBuilder restTemplateBuilder;

    public SoccersApi(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplateBuilder = restTemplateBuilder;
    }

    public String getFixtureJson(String fixtureId) {
        return getClient().getForObject(fixtureByIdUrl + fixtureId, String.class);
    }

    private RestTemplate getClient() {
        return restTemplateBuilder.build();
    }

    public String getFixturesByDateJson(String date) {
        return getClient().getForObject(fixtureByDateURL + date, String.class);
    }


}
