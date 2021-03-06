package lt.verbus.totalisator.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
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

    @ManyToMany(cascade=CascadeType.PERSIST)
    @JoinTable(
            name="user_role",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name ="role_id")}
    )
    private Set<Role> roles;

    @ManyToMany(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name="user_totalisator",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name ="totalisator_id")}
    )
    private List<Totalisator> totalisators;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Prediction> predictions;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}
