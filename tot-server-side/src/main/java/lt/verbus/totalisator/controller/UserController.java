package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.entity.Friendship;
import lt.verbus.totalisator.entity.User;
import lt.verbus.totalisator.service.FriendshipService;
import lt.verbus.totalisator.service.UserService;
import lt.verbus.totalisator.service.dto.FriendshipDTO;
import lt.verbus.totalisator.service.dto.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final FriendshipService friendshipService;

    public UserController(UserService userService, FriendshipService friendshipService) {
        this.userService = userService;
        this.friendshipService = friendshipService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable long id) {
        return userService.getUserDTOById(id);
    }

    @GetMapping("/{id}/friends")
    public List<FriendshipDTO> getFriendshipsByUserId(@PathVariable long id) {
        return friendshipService.getFriendshipsByUserId(id);
    }

    @GetMapping("find")
    public List<UserDTO> getUsersByPartialName(@RequestParam String name) {
        return userService.getUsersByPartialName(name);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User saveUser(@Valid @RequestBody User user) {
        return userService.saveUser(user);
    }

    @PostMapping("/{requesterId}/friends/add/{receiverId}")
    @ResponseStatus(HttpStatus.CREATED)
    public FriendshipDTO createFriendship(@PathVariable long requesterId, @PathVariable long receiverId) {
        return friendshipService.createFriendship(requesterId, receiverId);
    }

}
