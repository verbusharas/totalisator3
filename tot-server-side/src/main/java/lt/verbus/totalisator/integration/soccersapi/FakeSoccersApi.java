package lt.verbus.totalisator.integration.soccersapi;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class FakeSoccersApi {

    @Value("${fake.fixtures.url}")
    private String allFakeFixturesURL;

    @Value("${fake.fixture.url}")
    private String singleFakeFixtureURL;

    private final RestTemplateBuilder restTemplateBuilder;

    public FakeSoccersApi(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplateBuilder = restTemplateBuilder;
    }

    public String getAllFakeFixturesJson() {
        return getClient().getForObject(allFakeFixturesURL, String.class);
    }

    public String getFakeFixtureByIdJson(Integer id) {
        return getClient().getForObject(singleFakeFixtureURL + "/" + id, String.class);
    }


    private RestTemplate getClient() {
        return restTemplateBuilder.build();
    }



}
