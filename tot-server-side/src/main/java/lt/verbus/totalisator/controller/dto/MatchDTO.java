package lt.verbus.totalisator.controller.dto;

import lombok.Getter;
import lombok.Setter;
import lt.verbus.totalisator.entity.League;
import lt.verbus.totalisator.entity.Team;

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

    private Byte homeScore;

    private Byte awayScore;

    private String statusName;

}
