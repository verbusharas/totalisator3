package lt.verbus.totalisator.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.verbus.totalisator.entity.User;

@Setter
@Getter
@NoArgsConstructor
public class UserDTO {

    private Long id;

    private String username;

    private String name;

    public UserDTO (User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.name = user.getName();
    }

}
