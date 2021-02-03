package lt.verbus.totalisator.repository;

import lt.verbus.totalisator.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findUsersByNameContainingIgnoreCase(String partialUsername);

    @Query("SELECT u FROM User u JOIN FETCH u.roles WHERE u.username = :username")
    Optional<User> findWithRolesByUsername(@Param("username") String username);

    @Query("SELECT u FROM User u JOIN FETCH u.totalisators WHERE u.username = :username")
    Optional<User> findWithTotalisatorsByUsername(@Param("username") String username);

}
