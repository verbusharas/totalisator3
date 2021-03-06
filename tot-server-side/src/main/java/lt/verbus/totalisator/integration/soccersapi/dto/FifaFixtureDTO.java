package lt.verbus.totalisator.integration.soccersapi.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

import static lt.verbus.totalisator.util.DateConverter.shiftDateStringToUTC2;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class FifaFixtureDTO {

    @JsonAlias("id")
    private Integer fifaId;

    @JsonAlias("winner_team_id")
    private String winnerTeamId;

    @JsonProperty("league")
    private FifaLeagueDTO league;

    private String date;

    private FifaTeamDTO homeTeam;

    private FifaTeamDTO awayTeam;

    private String homeScore;

    private String awayScore;

    @JsonAlias("status")
    private Integer status;

    @JsonAlias("status_name")
    private String statusName;

    @SuppressWarnings("unchecked")
    @JsonProperty("teams")
    private void getTeams(Map<String, FifaTeamDTO> teams) {
        this.homeTeam = teams.get("home");
        this.awayTeam = teams.get("away");
    }

    @SuppressWarnings("unchecked")
    @JsonProperty("time")
    private void getDate(Map<String,String> timeInfo) {
        this.date = shiftDateStringToUTC2(timeInfo.get("datetime"));
    }


    @JsonProperty("scores")
    private void getScores(Map<String,String> scores) {
        this.homeScore = scores.get("home_score");
        this.awayScore = scores.get("away_score");
    }

    @JsonProperty("status_name")
    private void getStatus(String statusName) {
        if (status == 17) {
            this.statusName = "Notannounced";
        } else {
            this.statusName = statusName;
        }

    }

}
