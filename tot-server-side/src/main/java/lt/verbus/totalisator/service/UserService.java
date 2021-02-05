package lt.verbus.totalisator.service;

import lt.verbus.totalisator.domain.entity.Role;
import lt.verbus.totalisator.domain.entity.Totalisator;
import lt.verbus.totalisator.domain.entity.User;
import lt.verbus.totalisator.repository.RoleRepository;
import lt.verbus.totalisator.repository.UserRepository;
import lt.verbus.totalisator.controller.dto.UserDTO;
import lt.verbus.totalisator.exception.EntityNotFoundException;
import lt.verbus.totalisator.util.UserMapper;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;


    public UserService(UserRepository userRepository, RoleRepository roleRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
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
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        Role userRole = roleRepository.findByRoleName("USER")
                .orElseThrow(()->new EntityNotFoundException("Role not found"));
        user.setRoles(Set.of(userRole));
        return userMapper.mapEntityToDTO(userRepository.save(user));
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

    public List<UserDTO> getByTotalisatorId(Totalisator totalisator) {
       List<User> users = userRepository.findAllByTotalisatorsContaining(totalisator);
        return users.stream().map(userMapper::mapEntityToDTO).collect(Collectors.toList());
    }

}
