package lt.verbus.totalisator.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.verbus.totalisator.entity.Role;
import lt.verbus.totalisator.entity.Totalisator;
import lt.verbus.totalisator.entity.User;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Setter
@Getter
@NoArgsConstructor
public class UserDTO {

    private Long id;

    private String username;

    private String name;

    private Set<String> roles;

    private List<Long> totalisators;

    public UserDTO (User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.name = user.getName();
        this.roles = user.getRoles().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toSet());
    }

}
