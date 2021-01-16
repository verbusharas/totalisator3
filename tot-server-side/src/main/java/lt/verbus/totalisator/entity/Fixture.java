package lt.verbus.totalisator.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
@Getter
@Setter
public class Fixture {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long entity_id;

    private Integer id;

    @OneToOne(cascade = CascadeType.ALL)
    private League league;

    private String date;

    @OneToOne(cascade = CascadeType.ALL)
    private Team homeTeam;

    @OneToOne(cascade = CascadeType.ALL)
    private Team awayTeam;


}
