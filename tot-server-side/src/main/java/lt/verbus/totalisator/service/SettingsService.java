package lt.verbus.totalisator.service;

import lt.verbus.totalisator.domain.entity.Settings;
import lt.verbus.totalisator.repository.SettingsRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class SettingsService {


    private final SettingsRepository settingsRepository;

    public SettingsService(SettingsRepository settingsRepository) {
        this.settingsRepository = settingsRepository;
    }

    public Settings findByTotalisatorId(Long totalisatorId) {
        return settingsRepository.findByTotalisatorId(totalisatorId).orElseThrow(()-> new EntityNotFoundException("Settings were not found"));
    }

}
