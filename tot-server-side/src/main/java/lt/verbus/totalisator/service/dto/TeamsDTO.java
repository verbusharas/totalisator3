package lt.verbus.totalisator.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "home",
        "away"
})
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class TeamsDTO {
    @JsonProperty("home")
    private TeamDTO home;
    @JsonProperty("away")
    private TeamDTO away;
}