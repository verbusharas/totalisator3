package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.entity.User;
import lt.verbus.totalisator.controller.dto.UserDTO;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @PostMapping("/login")
    public UserDTO login(@AuthenticationPrincipal User user) {
        return new UserDTO(user);
    }

}

