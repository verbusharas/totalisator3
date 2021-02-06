package lt.verbus.totalisator.util.mapper;

import lt.verbus.totalisator.domain.entity.Friendship;
import lt.verbus.totalisator.controller.dto.FriendshipDTO;
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
        friendshipDTO.setRequester(userMapper.mapEntityToDTO(friendship.getRequester()));
        friendshipDTO.setReceiver(userMapper.mapEntityToDTO(friendship.getReceiver()));
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
