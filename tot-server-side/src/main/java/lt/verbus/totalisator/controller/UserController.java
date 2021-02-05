package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.domain.entity.User;
import lt.verbus.totalisator.service.FriendshipService;
import lt.verbus.totalisator.service.UserService;
import lt.verbus.totalisator.controller.dto.FriendshipDTO;
import lt.verbus.totalisator.controller.dto.UserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final FriendshipService friendshipService;

    public UserController(UserService userService, FriendshipService friendshipService) {
        this.userService = userService;
        this.friendshipService = friendshipService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO registerUser(@Valid @RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    // COMMENTED OUT ON 2021-02-05 CHECK IF NEEDED
//    @GetMapping("/{id}")
//    public UserDTO getUserById(@PathVariable long id) {
//        return userService.getUserDTOById(id);
//    }

    @GetMapping("/{id}/friends")
    public List<FriendshipDTO> getFriendshipsByUserId(@PathVariable long id) {
        return friendshipService.getFriendshipsByUserId(id);
    }

    @GetMapping("find")
    public List<UserDTO> getUsersByPartialName(@RequestParam String name) {
        return userService.getUsersByPartialName(name);
    }

    @PostMapping("/{requesterId}/friends/request/{receiverId}")
    @ResponseStatus(HttpStatus.CREATED)
    public FriendshipDTO createFriendRequest(@PathVariable long requesterId, @PathVariable long receiverId) {
        return friendshipService.createFriendRequest(requesterId, receiverId);
    }

    @PostMapping("/{accepterId}/friends/accept/{requesterId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public FriendshipDTO acceptFriendRequest(@PathVariable long requesterId, @PathVariable long accepterId) {
        return friendshipService.acceptFriendRequest(accepterId, requesterId);
    }

    @DeleteMapping("/{userId}/friends/{deleteId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFriendRequest(@PathVariable long userId, @PathVariable long deleteId) {
        friendshipService.deleteFriendRequest(userId, deleteId);
    }


}
