package lt.verbus.totalisator.repository;

import lt.verbus.totalisator.entity.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    @Query("SELECT f FROM Friendship f JOIN User u ON f.receiver.id = u.id  WHERE f.receiver.id = :id OR f.requester.id =:id")
    List<Friendship> findAllByUserId(Long id);

}
