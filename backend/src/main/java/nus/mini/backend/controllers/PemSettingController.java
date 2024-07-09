package nus.mini.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import nus.mini.backend.models.PemSetting;
import nus.mini.backend.services.PemSettingService;

@RestController
@RequestMapping("/api/pemsettings")
@Validated
public class PemSettingController {

    @Autowired
    private PemSettingService pemSettingService;

    @GetMapping("/all")
    public ResponseEntity<List<PemSetting>> getAllPemSettings() {
        List<PemSetting> pemSettings = pemSettingService.findAll();
        if (pemSettings.isEmpty()) {
            return ResponseEntity.noContent().build();
         } else {
            return ResponseEntity.ok(pemSettings);
       }   
    }

    @GetMapping("/{id}")
    public ResponseEntity<PemSetting> getPemSettingById(@PathVariable int id) {
        PemSetting pemSetting = pemSettingService.findById(id);
        if (pemSetting != null) {
            return ResponseEntity.ok(pemSetting);
        } else {
            return ResponseEntity.notFound().build();   
        }
    }

    @PostMapping("/add")
    public ResponseEntity<PemSetting> createPemSetting(@Valid @RequestBody PemSetting pemSetting) {
        int id = pemSettingService.save(pemSetting);
        if (id == 0) {
            return ResponseEntity.badRequest().build();
        }
        pemSetting.setId(id);
        return ResponseEntity.ok(pemSetting);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PemSetting> updatePemSetting(@PathVariable int id, @Valid @RequestBody PemSetting pemSetting) {
        pemSetting.setId(id);
        pemSettingService.update(pemSetting);
        return ResponseEntity.ok(pemSetting);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePemSettingById(@PathVariable int id) {
        pemSettingService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
