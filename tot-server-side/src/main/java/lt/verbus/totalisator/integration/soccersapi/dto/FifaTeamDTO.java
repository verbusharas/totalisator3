package lt.verbus.totalisator.integration.soccersapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class FifaTeamDTO {

    @JsonProperty("id")
    private Integer id;
    @JsonProperty("name")
    private String name;

    private String shortCode;

    @JsonProperty("img")
    private String img;

    @SuppressWarnings("unchecked")
    @JsonProperty("short_code")
    private void getCountryName(String shortCode) {
        this.shortCode = shortCode;
    }

}

