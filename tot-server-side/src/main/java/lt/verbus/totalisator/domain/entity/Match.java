package lt.verbus.totalisator.domain.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "soccer_match")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long entityId;

    private Integer fifaId;

    @OneToOne(cascade = CascadeType.ALL)
    private League league;

    private String date;

    @OneToOne(cascade = CascadeType.ALL)
    private Team homeTeam;

    @OneToOne(cascade = CascadeType.ALL)
    private Team awayTeam;

    @ManyToOne
    private Totalisator totalisator;

    private Integer homeScore;
    
    private Integer awayScore;

    private String statusName;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL)
    private List<Prediction> predictions;

}
