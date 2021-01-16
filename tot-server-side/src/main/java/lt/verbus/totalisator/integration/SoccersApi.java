package lt.verbus.totalisator.integration;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import com.fasterxml.jackson.databind.ObjectMapper;
import lt.verbus.totalisator.service.dto.FixturesResponseDTO;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Component;


@Component
public class SoccersApi {

    @Value("${soccersapi.fixture.by.date.url}")
    private String fixtureByDateURL;

    private ObjectMapper objectMapper;

    public SoccersApi(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }


    public FixturesResponseDTO getFixturesByDate(String date) {
        HttpURLConnection con = null;
        StringBuilder jsonString = new StringBuilder();
        FixturesResponseDTO data = null;
        try {
            URL url = new URL(fixtureByDateURL + date);
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
            data = objectMapper.readValue(jsonString.toString(), FixturesResponseDTO.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return data;

    }
}
