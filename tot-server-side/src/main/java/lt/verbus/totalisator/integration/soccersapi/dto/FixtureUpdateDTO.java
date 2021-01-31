package lt.verbus.totalisator.integration.soccersapi.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class FixtureUpdateDTO {

    @JsonAlias("status_name")
    private String statusName;

    private String homeScore;

    private String awayScore;

    @JsonProperty("scores")
    private void getScores(Map<String,String> nestedScores) {
        this.homeScore = nestedScores.get("home_score");
        this.awayScore = nestedScores.get("away_score");
    }

}
