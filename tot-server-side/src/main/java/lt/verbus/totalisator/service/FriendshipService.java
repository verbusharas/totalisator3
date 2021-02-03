package lt.verbus.totalisator.service;

import lt.verbus.totalisator.domain.entity.Friendship;
import lt.verbus.totalisator.domain.entity.User;
import lt.verbus.totalisator.repository.FriendshipRepository;
import lt.verbus.totalisator.controller.dto.FriendshipDTO;
import lt.verbus.totalisator.exception.EntityNotFoundException;
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

    public FriendshipDTO createFriendRequest(long requesterId, long receiverId) {
        Friendship friendship = friendshipRepository
                .findByFriendIds(requesterId, receiverId)
                .orElse(createFriendship(requesterId, receiverId));
        // Friendship gets automatically accepted
        // In case both parties have accidentally sent requests to one another
        if (!friendship.getIsAccepted() && friendship.getRequester().getId() != requesterId) {
            friendship.setIsAccepted(true);
        }
        return friendshipMapper.convertFriendshipEntityToDTO(friendshipRepository.save(friendship));
    }

    public FriendshipDTO acceptFriendRequest(long receiverId, long requesterId) {
        Friendship friendship = friendshipRepository
                .findByReceiverIdAndRequesterId(receiverId, requesterId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Friendship of ids " + receiverId + " and " + requesterId + " not found."));
        friendship.setIsAccepted(true);
        return friendshipMapper.convertFriendshipEntityToDTO(friendshipRepository.save(friendship));
    }

    public List<FriendshipDTO> getFriendshipsByUserId(long id) {
        return friendshipRepository.findAllByUserId(id).stream()
                .map(friendshipMapper::convertFriendshipEntityToDTO)
                .collect(Collectors.toList());
    }

    public void deleteFriendRequest(long userId, long deleteId) {
        Friendship friendship = friendshipRepository
                .findByFriendIds(userId, deleteId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Friendship of ids " + userId + " and " + deleteId + " not found."));
        friendshipRepository.deleteById(friendship.getId());
    }

    private Friendship createFriendship(long requesterId, long receiverId) {
        User requester = userService.getById(requesterId);
        User receiver = userService.getById(receiverId);
        Friendship friendship = new Friendship();
        friendship.setRequester(requester);
        friendship.setReceiver(receiver);
        friendship.setIsAccepted(false);
        return friendship;
    }
}
