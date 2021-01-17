package lt.verbus.totalisator.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "id",
        "name",
        "country_name"
})
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

