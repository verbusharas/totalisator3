package lt.verbus.totalisator.repository;

import lt.verbus.totalisator.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

    List<Match> findMatchesByStatusName(String statusName);

    @Query("SELECT m FROM Match m JOIN FETCH m.totalisator WHERE m.totalisator.id = :id")
    List<Match> findByTotalisatorId(Long id);

    List<Match> findByTotalisatorIdAndStatusName(Long id, String statusName);

    @Query("SELECT m FROM Match m JOIN FETCH m.totalisator WHERE m.id = :matchId AND m.totalisator.id = :totalisatorId")
    Match findByTotalisatorIdAndMatchId(Long totalisatorId, Long matchId);
}
