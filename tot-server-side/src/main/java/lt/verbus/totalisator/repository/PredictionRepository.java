package lt.verbus.totalisator.repository;

import lt.verbus.totalisator.domain.entity.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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


    //TODO: LEARN HOW TO MOVE OUT DML ANNOTATIONS TO SERVICE
    @Transactional
    @Modifying
    @Query(
            value = "DELETE p FROM prediction p " +
                    "JOIN soccer_match m ON p.match_entity_id = m.entity_id " +
                    "JOIN totalisator t ON m.totalisator_id = t.id " +
                    "WHERE p.user_id = :userId AND m.totalisator_id = :totalisatorId",
            nativeQuery = true)
    void deleteAllByUserAndTotalisatorId(Long userId, Long totalisatorId);





}