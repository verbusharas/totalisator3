package lt.verbus.totalisator.service;

import lt.verbus.totalisator.controller.dto.SettingsDTO;
import lt.verbus.totalisator.domain.entity.Settings;
import lt.verbus.totalisator.repository.SettingsRepository;
import lt.verbus.totalisator.util.mapper.SettingsMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class SettingsService {


    private final SettingsRepository settingsRepository;
    private final SettingsMapper settingsMapper;

    public SettingsService(SettingsRepository settingsRepository, SettingsMapper settingsMapper) {
        this.settingsRepository = settingsRepository;
        this.settingsMapper = settingsMapper;
    }

    public Settings findByTotalisatorId(Long totalisatorId) {
        return settingsRepository.findByTotalisatorId(totalisatorId).orElseThrow(()-> new EntityNotFoundException("Settings were not found"));
    }

    public SettingsDTO findDTOByTotalisatorId(Long totalisatorId) {
        Settings settings = settingsRepository.findByTotalisatorId(totalisatorId).orElseThrow(()-> new EntityNotFoundException("Settings were not found"));
        return settingsMapper.mapEntityToDTO(settings);
    }

    public SettingsDTO save(Long totalisatorId, SettingsDTO newSettings) {
        newSettings.setTotalisatorId(totalisatorId);
        Settings currentSettings = settingsRepository.findByTotalisatorId(totalisatorId).orElseThrow(()->new EntityNotFoundException("Settings were not found"));
        BeanUtils.copyProperties(newSettings, currentSettings);
        return settingsMapper.mapEntityToDTO(settingsRepository.save(currentSettings));
    }
}
