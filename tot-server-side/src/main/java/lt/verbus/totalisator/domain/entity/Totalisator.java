package lt.verbus.totalisator.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Setter
@Getter
public class Totalisator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne
    private User manager;

    @OneToMany(mappedBy = "totalisator", cascade = CascadeType.ALL)
    List<Match> matches;

    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(
            name="user_totalisator",
            joinColumns = {@JoinColumn(name = "totalisator_id")},
            inverseJoinColumns = {@JoinColumn(name ="user_id")}
    )
    List<User> players;

}