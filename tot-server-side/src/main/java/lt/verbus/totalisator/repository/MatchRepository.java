package lt.verbus.totalisator.repository;

import lt.verbus.totalisator.domain.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

    @Query("SELECT m FROM Match m JOIN FETCH m.totalisator WHERE m.totalisator.id = :id")
    List<Match> findAllByTotalisatorId(Long id);

    @Query("SELECT m FROM Match m JOIN FETCH m.totalisator " +
            "WHERE m.totalisator.id = :id " +
            "AND NOT m.statusName = 'Finished' " +
            "AND NOT m.statusName = 'Inplay'")
    List<Match> findPendingByTotalisatorId(Long id);

    @Query("SELECT m FROM Match m JOIN FETCH m.totalisator " +
            "WHERE m.totalisator.id = :id " +
            "AND m.statusName = 'Finished' ")
    List<Match> findFinishedByTotalisatorId(Long id);



}
