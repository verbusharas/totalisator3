package lt.verbus.totalisator.util;

import lt.verbus.totalisator.entity.Role;
import lt.verbus.totalisator.entity.Totalisator;
import lt.verbus.totalisator.entity.User;
import lt.verbus.totalisator.service.dto.UserDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper {

    public UserDTO convertUserEntityToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setName(user.getName());
        userDTO.setRoles(user.getRoles().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toSet()));
        userDTO.setTotalisators(user
                .getTotalisators()
                .stream()
                .map(Totalisator::getId)
                .collect(Collectors.toList()));

        BeanUtils.copyProperties(user, userDTO);
        return userDTO;
    }


    public User convertUserDTOtoEntity(UserDTO userDTO) {
        User user = new User();
        BeanUtils.copyProperties(userDTO, user);
        return user;
    }

}
