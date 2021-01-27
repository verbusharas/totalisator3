package lt.verbus.totalisator.service;

import lt.verbus.totalisator.entity.User;
import lt.verbus.totalisator.repository.UserRepository;
import lt.verbus.totalisator.service.dto.UserDTO;
import lt.verbus.totalisator.service.exception.EntityNotFoundException;
import lt.verbus.totalisator.util.UserMapper;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public UserDTO getUserDTOById(Long id){
        return userMapper.convertUserEntityToDTO(getUserById(id));
    }

    protected User getUserById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(id));
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

    public List<UserDTO> getUsersByPartialName(String partialName) {
        List<User> users = userRepository.findUsersByNameContainingIgnoreCase(partialName);
        return users.stream().map(userMapper::convertUserEntityToDTO).collect(Collectors.toList());
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findWithRolesByUsername(username).orElseThrow(()->new EntityNotFoundException("User not found"));
    }

}
