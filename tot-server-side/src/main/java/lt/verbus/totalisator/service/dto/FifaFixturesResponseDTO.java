package lt.verbus.totalisator.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class FifaFixturesResponseDTO {
    @JsonProperty("data")
    private List<FifaFixtureDTO> fifaFixtureDTOS = null;

    private String requestsLeft;

    @SuppressWarnings("unchecked")
    @JsonProperty("meta")
    private void getTeams(Map<String,String> meta) {
        this.requestsLeft = meta.get("requests_left");
    }
}
