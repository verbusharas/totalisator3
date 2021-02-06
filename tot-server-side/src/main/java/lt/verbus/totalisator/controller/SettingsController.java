package lt.verbus.totalisator.controller;

import lt.verbus.totalisator.controller.dto.SettingsDTO;
import lt.verbus.totalisator.domain.entity.Settings;
import lt.verbus.totalisator.service.SettingsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/totalisator/{id}/settings")
public class SettingsController {

    private final SettingsService settingsService;

    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @GetMapping
    public SettingsDTO getSettingsByTotalisatorId (@PathVariable Long id) {
        return settingsService.findDTOByTotalisatorId(id);
    }

    @PutMapping
    public SettingsDTO saveTotalisatorSettings (@PathVariable Long id, @RequestBody SettingsDTO settings) {
        return settingsService.save(id, settings);
    }
}
