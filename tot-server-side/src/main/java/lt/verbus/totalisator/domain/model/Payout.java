package lt.verbus.totalisator.domain.model;


import lombok.Getter;
import lombok.Setter;
import lt.verbus.totalisator.domain.entity.Prediction;

@Getter
@Setter
public class Payout {

    private Prediction prediction;

    private Integer award;

}
