package lt.verbus.totalisator.service;

import lt.verbus.totalisator.domain.entity.User;
import lt.verbus.totalisator.repository.UserRepository;
import lt.verbus.totalisator.controller.dto.UserDTO;
import lt.verbus.totalisator.exception.EntityNotFoundException;
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

    public List<UserDTO> getAllUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(userMapper::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    public UserDTO getUserDTOById(Long id){
        return userMapper.mapEntityToDTO(getById(id));
    }

    public User getById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(id));
    }

    public UserDTO saveUser(User user){
        User savedUser = userRepository.save(user);
        return userMapper.mapEntityToDTO(savedUser);
    }

    public List<UserDTO> getUsersByPartialName(String partialName) {
        List<User> users = userRepository.findUsersByNameContainingIgnoreCase(partialName);
        return users.stream().map(userMapper::mapEntityToDTO).collect(Collectors.toList());
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findWithRolesByUsername(username).orElseThrow(()->new UsernameNotFoundException("User not found"));
    }

    public UserDTO getUserDTOByUser(User user) {
        return userMapper.mapEntityToDTO(user);
    }

//    public User getUserWithTotalisators(String username) {
//        return userRepository.findWithTotalisatorsByUsername(username).orElseThrow(()->new UsernameNotFoundException("User not found"));
////        return playerMapper.convertUserEntityToPlayerDTO(user);
//    }
}
