package lt.verbus.totalisator.repository;

import lt.verbus.totalisator.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findUsersByNameContainingIgnoreCase(String partialUsername);

}
