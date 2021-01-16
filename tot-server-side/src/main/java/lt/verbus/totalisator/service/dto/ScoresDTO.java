package lt.verbus.totalisator.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "home_score",
        "away_score",
        "ht_score",
        "ft_score",
        "et_score",
        "ps_score"
})
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ScoresDTO {
    @JsonProperty("home_score")
    private Byte homeScore;
    @JsonProperty("away_score")
    private Byte awayScore;
    @JsonProperty("ht_score")
    private String htScore;
    @JsonProperty("ft_score")
    private String ftScore;
    @JsonProperty("et_score")
    private String etScore;
    @JsonProperty("ps_score")
    private String psScore;
}

