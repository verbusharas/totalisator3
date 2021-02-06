package lt.verbus.totalisator.domain.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long entityId;

    private Integer fifaId;

    @OneToOne(cascade = CascadeType.PERSIST)
    private League league;

    private String date;

    @OneToOne(cascade = CascadeType.PERSIST)
    private Team homeTeam;

    @OneToOne(cascade = CascadeType.PERSIST)
    private Team awayTeam;

    @ManyToOne
    private Totalisator totalisator;

    private Integer homeScore;
    
    private Integer awayScore;

    private String statusName;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL)
    private List<Prediction> predictions;

}
