package lt.verbus.totalisator.service;

import lt.verbus.totalisator.entity.User;
import lt.verbus.totalisator.repository.UserRepository;
import lt.verbus.totalisator.service.exception.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(id));
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

}
