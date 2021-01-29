package lt.verbus.totalisator.repository;

import lt.verbus.totalisator.entity.Totalisator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TotalisatorRepository extends JpaRepository<Totalisator, Long> {

    @Query("SELECT t FROM Totalisator t INNER JOIN t.players player where player.id = :id")
    List<Totalisator> findAllByUserId(Long id);

}
