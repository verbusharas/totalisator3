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
public class FifaLeagueDTO {
    @JsonProperty("id")
    private Integer id;
    @JsonProperty("name")
    private String name;

    private String countryName;

    @SuppressWarnings("unchecked")
    @JsonProperty("country_name")
    private void getCountryName(String countryName) {
        this.countryName = countryName;
    }
}

