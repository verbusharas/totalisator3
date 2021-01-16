package lt.verbus.totalisator.service;

import lt.verbus.totalisator.entity.Fixture;
import lt.verbus.totalisator.repository.FixtureRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class FixtureService {
    private final FixtureRepository fixtureRepository;

    public FixtureService(FixtureRepository fixtureRepository) {
        this.fixtureRepository = fixtureRepository;
    }

    @Transactional
    public List<Fixture> saveFixtures(List<Fixture> fixtures) {
        return fixtureRepository.saveAll(fixtures);
    }

    public List<Fixture> getTotalisatorFixtures() {
        return fixtureRepository.findAll();
    }
}

