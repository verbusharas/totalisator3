package lt.verbus.totalisator.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

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

//    @OneToMany(mappedBy = "totalisator", cascade = CascadeType.ALL)
//    List<Match> matches;

    @ManyToMany
    @Cascade({org.hibernate.annotations.CascadeType.ALL})
    @JoinTable(
            name="user_totalisator",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name ="totalisator_id")}
    )
    List<User> players;

}
