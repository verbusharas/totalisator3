package lt.verbus.totalisator.service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendshipDTO {

    private Long id;

    private UserDTO requester;

    private UserDTO receiver;

    private Boolean isAccepted;

}
