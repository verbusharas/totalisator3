package lt.verbus.totalisator.repository;

import lt.verbus.totalisator.domain.entity.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    @Query("SELECT f FROM Friendship f JOIN User u ON f.receiver.id = u.id  WHERE f.receiver.id = :id OR f.requester.id =:id")
    List<Friendship> findAllByUserId(Long id);

    @Query("SELECT f FROM Friendship f JOIN User u ON f.receiver.id = u.id  WHERE f.receiver.id = :receiverId AND f.requester.id =:requesterId")
    Optional<Friendship> findByReceiverIdAndRequesterId(Long receiverId, Long requesterId);

    @Query("SELECT f FROM Friendship f JOIN User u ON f.receiver.id = u.id  " +
            "WHERE (f.receiver.id = :friendId1 AND f.requester.id = :friendId2) OR (f.receiver.id = :friendId2 AND f.requester.id = :friendId1)")
    Optional<Friendship> findByFriendIds(Long friendId1, Long friendId2);

}
