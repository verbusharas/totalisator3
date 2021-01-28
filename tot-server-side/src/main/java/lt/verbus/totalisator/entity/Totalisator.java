package lt.verbus.totalisator.entity;

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

//    @OneToMany(mappedBy = "totalisator", cascade = CascadeType.ALL)
//    List<Match> matches;

    @ManyToMany
    @Column(name="user")
    List<User> players;

}
