package lt.verbus.totalisator.util;

import lt.verbus.totalisator.domain.entity.Role;
import lt.verbus.totalisator.domain.entity.Totalisator;
import lt.verbus.totalisator.domain.entity.User;
import lt.verbus.totalisator.controller.dto.UserDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper {

    private final TotalisatorBasicMapper totalisatorBasicMapper;

    public UserMapper(TotalisatorBasicMapper totalisatorBasicMapper) {
        this.totalisatorBasicMapper = totalisatorBasicMapper;
    }

    public UserDTO mapEntityToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setName(user.getName());

        userDTO.setRoles(user.getRoles().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toSet()));

        if (user.getTotalisators() != null) {
            userDTO.setTotalisators(user
                    .getTotalisators()
                    .stream()
                    .map(totalisatorBasicMapper::convertTotalisatorEntityToBasicDTO)
                    .collect(Collectors.toList()));

            userDTO.setManagedTotalisators(user
                    .getTotalisators()
                    .stream()
                    .filter(t-> t.getManager().getId().equals(user.getId()))
                    .map(Totalisator::getId)
                    .collect(Collectors.toList()));
        }

        BeanUtils.copyProperties(user, userDTO);
        return userDTO;
    }

    public User convertUserDTOtoEntity(UserDTO userDTO) {
        User user = new User();
        BeanUtils.copyProperties(userDTO, user);
        return user;
    }

}
