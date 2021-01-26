package lt.verbus.totalisator.util;

import lt.verbus.totalisator.entity.Friendship;
import lt.verbus.totalisator.service.dto.FriendshipDTO;
import org.springframework.stereotype.Component;

@Component
public class FriendshipMapper {

    private final UserMapper userMapper;

    public FriendshipMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }


    public FriendshipDTO convertFriendshipEntityToDTO(Friendship friendship) {
        FriendshipDTO friendshipDTO = new FriendshipDTO();
        friendshipDTO.setId(friendship.getId());
        friendshipDTO.setRequester(userMapper.convertUserEntityToDTO(friendship.getRequester()));
        friendshipDTO.setReceiver(userMapper.convertUserEntityToDTO(friendship.getReceiver()));
        friendshipDTO.setIsAccepted(friendship.getIsAccepted());
        return friendshipDTO;
    }

    public Friendship convertFriendshipDTOtoEntity(FriendshipDTO friendshipDTO) {
        Friendship friendship = new Friendship();
        friendship.setId(friendshipDTO.getId());
        friendship.setRequester(userMapper.convertUserDTOtoEntity(friendshipDTO.getRequester()));
        friendship.setReceiver(userMapper.convertUserDTOtoEntity(friendshipDTO.getReceiver()));
        friendship.setIsAccepted(friendshipDTO.getIsAccepted());
        return friendship;
    }

}
