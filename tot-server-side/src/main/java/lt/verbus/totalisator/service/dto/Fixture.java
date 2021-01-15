package lt.verbus.totalisator.service.dto;

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
public class Fixture {
    @JsonProperty("id")
    private Integer id;
    @JsonProperty("status_name")
    private String statusName;
    @JsonProperty("winner_team_id")
    private Integer winnerTeamId;
    @JsonProperty("league")
    private League league;

    private String time;

    private Team homeTeam;

    private Team awayTeam;

    private String homeScore;

    private String awayScore;

    private String htScore;

    private String ftScore;

    private String etScore;

    private String psScore;

    @SuppressWarnings("unchecked")
    @JsonProperty("teams")
    private void getTeams(Map<String, Team> teams) {
        this.homeTeam = teams.get("home");
        this.awayTeam = teams.get("away");
    }

    @SuppressWarnings("unchecked")
    @JsonProperty("time")
    private void getTime(Map<String,String> timeInfo) {
        this.time = timeInfo.get("datetime");
    }

    @SuppressWarnings("unchecked")
    @JsonProperty("scores")
    private void getScores(Map<String,String> scores) {
        this.homeScore = scores.get("home_score");
        this.awayScore = scores.get("away_score");
        this.htScore = scores.get("ht_score");
        this.ftScore = scores.get("ft_score");
        this.etScore = scores.get("et_score");
        this.psScore = scores.get("ps_score");
    }
}
