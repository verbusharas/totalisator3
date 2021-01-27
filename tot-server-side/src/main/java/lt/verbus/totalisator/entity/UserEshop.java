package lt.verbus.totalisator.entity;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Set;

//@Entity
@Getter
@Setter
public class UserEshop /* implements UserDetails*/{

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(unique = true, nullable = false)
//    @NotBlank
//    @Size(min = 3, max = 200)
//    private String username;
//
//    @Column(nullable = false)
//    private String name;
//
//    @Column(nullable = false)
//    private String lastname;
//
//    @Column(nullable=false)
//    @Size(min=3)
//    @NotBlank
//    private String password;
//
//    @ManyToMany
//    @Cascade(CascadeType.PERSIST)
//    @JoinTable(
//            name="user_role",
//            joinColumns = {@JoinColumn(name = "user_id")},
//            inverseJoinColumns = {@JoinColumn(name ="role_id")}
//    )
//    private Set<Role> roles;
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return roles;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
}
