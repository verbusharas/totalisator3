package lt.verbus.totalisator.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lt.verbus.totalisator.integration.soccersapi.SoccersApi;
import lt.verbus.totalisator.integration.soccersapi.dto.FifaFixtureDTO;
import lt.verbus.totalisator.integration.soccersapi.dto.FixtureUpdateDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FifaService {

    private final SoccersApi soccersApi;
    private final ObjectMapper objectMapper;

    public FifaService(SoccersApi soccersApi, ObjectMapper objectMapper) {
        this.soccersApi = soccersApi;
        this.objectMapper = objectMapper;
    }

    public FixtureUpdateDTO getFixtureUpdateById(Long id) {
        FixtureUpdateDTO fixtureUpdateDTO = new FixtureUpdateDTO();

        String json = soccersApi.getFixtureJson(String.valueOf(id));
        ObjectNode root;

        try {
            root = objectMapper.readValue(json, ObjectNode.class);
            fixtureUpdateDTO = objectMapper.readValue(root.get("data").toString(), FixtureUpdateDTO.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return fixtureUpdateDTO;
    }

    public List<FifaFixtureDTO> getFifaFixturesByDate(String date) {
        List<FifaFixtureDTO> fixtures = new ArrayList<>();

        String json = soccersApi.getFixturesByDateJson(date);
        ObjectNode root;

        try {
            root = objectMapper.readValue(json, ObjectNode.class);

           fixtures = objectMapper.readValue(root.get("data").toString(), new TypeReference<List<FifaFixtureDTO>>(){});

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return fixtures;
    }

}
