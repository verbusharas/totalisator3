package lt.verbus.totalisator.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class League {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long entity_id;

    private Integer id;

    private String name;

    private String countryName;

}

