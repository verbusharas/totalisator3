package lt.verbus.totalisator.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lt.verbus.totalisator.integration.soccersapi.FakeSoccersApi;
import lt.verbus.totalisator.integration.soccersapi.SoccersApi;
import lt.verbus.totalisator.integration.soccersapi.dto.FifaFixtureDTO;
import lt.verbus.totalisator.integration.soccersapi.dto.FixtureUpdateDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FifaService {

    private final SoccersApi soccersApi;
    private final FakeSoccersApi fakeSoccersApi;
    private final ObjectMapper objectMapper;
    private final List<Integer> LEAGUES = Arrays.asList(539,541,583,594,637,719,764);


    public FifaService(SoccersApi soccersApi, FakeSoccersApi fakeSoccersApi, ObjectMapper objectMapper) {
        this.soccersApi = soccersApi;
        this.fakeSoccersApi = fakeSoccersApi;
        this.objectMapper = objectMapper;
    }

    public FixtureUpdateDTO getFixtureUpdateById(Integer id) {
        FixtureUpdateDTO fixtureUpdateDTO = new FixtureUpdateDTO();
        try {
            String json = soccersApi.getFixtureJson(String.valueOf(id));
            ObjectNode root = objectMapper.readValue(json, ObjectNode.class);
            if (root.get("data").toString().equals("[]")) {
                // For demonstration purposes: if match ID was of fake match
                // SoccersAPI returns empty array since not found in their database
                String fakeJson = fakeSoccersApi.getFakeFixtureByIdJson(id);
                root = objectMapper.readValue(fakeJson, ObjectNode.class);
            }
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

            if (root.get("data") != null) {
                fixtures = objectMapper.readValue(root.get("data").toString(), new TypeReference<List<FifaFixtureDTO>>(){});
            }

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return fixtures.stream().filter(fifaFixtureDTO -> LEAGUES.contains(fifaFixtureDTO.getLeague().getId())).collect(Collectors.toList());
    }

    public List<FifaFixtureDTO> getFakeFifaFixtures() {

        List<FifaFixtureDTO> fixtures = new ArrayList<>();

        String json = fakeSoccersApi.getAllFakeFixturesJson();
        ObjectNode root;

        try {
            root = objectMapper.readValue(json, ObjectNode.class);

            if (root.get("data") != null) {
                fixtures = objectMapper.readValue(root.get("data").toString(), new TypeReference<List<FifaFixtureDTO>>() {
                });
            }

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return fixtures;

    }
}
