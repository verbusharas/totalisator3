package lt.verbus.totalisator.integration.soccersapi;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import com.fasterxml.jackson.databind.ObjectMapper;
import lt.verbus.totalisator.integration.soccersapi.dto.FifaFixturesResponseDTO;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Component;


@Component
public class SoccersApi {

    @Value("${soccersapi.fixture.by.date.url}")
    private String fixtureByDateURL;

    @Value("${fake.fixture.url}")
    private String fakeFixtureURL;

    private final ObjectMapper objectMapper;

    public SoccersApi(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }


    public FifaFixturesResponseDTO getFixturesByDate(String date) {
        HttpURLConnection con = null;
        StringBuilder jsonString = new StringBuilder();
        FifaFixturesResponseDTO data = null;
        try {
            String urlPath = date.equals("fake") ? fakeFixtureURL : fixtureByDateURL + date;
            URL url = new URL(urlPath);
            con = (HttpURLConnection) url.openConnection();

            con.setRequestMethod("GET");
            con.setRequestProperty("Content-Type", "application/json");
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                jsonString.append(inputLine);
            }
            in.close();
            con.disconnect();
            data = objectMapper.readValue(jsonString.toString(), FifaFixturesResponseDTO.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return data;

    }
}
