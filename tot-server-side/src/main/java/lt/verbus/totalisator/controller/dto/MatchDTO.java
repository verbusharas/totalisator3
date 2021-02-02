package lt.verbus.totalisator.controller.dto;

import lombok.Getter;
import lombok.Setter;
import lt.verbus.totalisator.entity.League;
import lt.verbus.totalisator.entity.Team;

import java.util.List;

@Setter
@Getter
public class MatchDTO {

    public Long entityId;

    private Integer fifaId;

    private League league;

    private String date;

    private Team homeTeam;

    private Team awayTeam;

    private Long totalisatorId;

    private Integer homeScore;

    private Integer awayScore;

    private String statusName;

    private List<PredictionBasicDTO> predictions;

}
