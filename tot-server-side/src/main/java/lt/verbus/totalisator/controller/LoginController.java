package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.domain.entity.User;
import lt.verbus.totalisator.controller.dto.UserDTO;
import lt.verbus.totalisator.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public UserDTO login(@AuthenticationPrincipal User user) {
        return userService.getUserDTOByUser(user);
    }

}

