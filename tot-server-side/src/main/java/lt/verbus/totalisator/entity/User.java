package lt.verbus.totalisator.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Email
    @Column(nullable = false)
    private String username;

    @Size(min = 8, max = 100)
    @Column(nullable = false)
    private String password;

    @Size(min = 3, max = 30)
    @Column(nullable = false)
    private String name;


    @OneToMany(mappedBy = "requester", cascade = CascadeType.ALL)
    private Set<Friendship> friendships;

//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(
//            name="friends",
//            joinColumns = {@JoinColumn(name = "user1_id")},
//            inverseJoinColumns = {@JoinColumn(name ="user2_id")}
//    )
//    private List<Long> friends;

//    @ManyToMany
//    private List<User> receivedFriendRequests;


}
