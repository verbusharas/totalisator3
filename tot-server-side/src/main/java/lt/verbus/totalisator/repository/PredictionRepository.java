package lt.verbus.totalisator.repository;

import lt.verbus.totalisator.domain.entity.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PredictionRepository extends JpaRepository<Prediction, Long> {

    @Query("SELECT p FROM Prediction p JOIN FETCH p.match m JOIN FETCH p.user u WHERE m.entityId = :matchId AND u.id = :playerId")
    Optional<Prediction> findByMatchIdAndPlayerId(Long matchId, Long playerId);

    @Query("SELECT p FROM Prediction p JOIN FETCH p.match m WHERE m.entityId = :matchId")
    List<Prediction> findAllByMatchId(Long matchId);

    @Query("SELECT p FROM Prediction p " +
            "JOIN FETCH p.match m " +
            "JOIN FETCH m.totalisator " +
            "WHERE m.totalisator.id = :totalisatorId")
    List<Prediction> findAllByTotalisatorId(Long totalisatorId);
}