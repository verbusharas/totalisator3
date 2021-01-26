package lt.verbus.totalisator.service;

import lt.verbus.totalisator.entity.Friendship;
import lt.verbus.totalisator.entity.User;
import lt.verbus.totalisator.repository.FriendshipRepository;
import lt.verbus.totalisator.service.dto.FriendshipDTO;
import lt.verbus.totalisator.service.exception.EntityNotFoundException;
import lt.verbus.totalisator.util.FriendshipMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UserService userService;
    private final FriendshipMapper friendshipMapper;

    public FriendshipService(FriendshipRepository friendshipRepository, UserService userService, FriendshipMapper friendshipMapper) {
        this.friendshipRepository = friendshipRepository;
        this.userService = userService;
        this.friendshipMapper = friendshipMapper;
    }

    public FriendshipDTO createFriendRequest(long requesterId, long receiverId){
        User requester =  userService.getUserById(requesterId);
        User receiver =  userService.getUserById(receiverId);
        Friendship friendship = new Friendship();
        friendship.setRequester(requester);
        friendship.setReceiver(receiver);
        friendship.setIsAccepted(false);
        Friendship savedFriendship = friendshipRepository.save(friendship);
        return friendshipMapper.convertFriendshipEntityToDTO(savedFriendship);
    }

    public FriendshipDTO acceptFriendRequest(long receiverId, long requesterId) {
        Friendship friendship = friendshipRepository.findByReceiverIdAndRequesterId(receiverId, requesterId).orElseThrow(()->new EntityNotFoundException(receiverId));
        friendship.setIsAccepted(true);
        return friendshipMapper.convertFriendshipEntityToDTO(friendshipRepository.save(friendship));
    }

    public List<FriendshipDTO> getFriendshipsByUserId(long id) {
        return friendshipRepository.findAllByUserId(id).stream().map(friendshipMapper::convertFriendshipEntityToDTO).collect(Collectors.toList());
    }
}
