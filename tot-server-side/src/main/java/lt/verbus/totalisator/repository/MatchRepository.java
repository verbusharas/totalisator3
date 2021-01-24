package lt.verbus.totalisator.repository;

import lt.verbus.totalisator.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

    List<Match> findMatchesByStatusName(String statusName);

}
