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

import nus.mini.backend.jdbcRepositories.GPhotoRepository;
import nus.mini.backend.models.GPhotoSetting;


@RestController
@RequestMapping("/api/gphoto")
@Validated
public class GPhotoController {
    @Autowired
    private GPhotoRepository gPhotoRepository;

    @GetMapping("/all")
    public List<GPhotoSetting> getAllGPhotos(){
        return gPhotoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GPhotoSetting>getGphotoById(@PathVariable int id){
        GPhotoSetting gPhotoSetting= gPhotoRepository.findById(id);
        if(gPhotoSetting== null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(gPhotoSetting);
    }

    @PostMapping("/add")
    public ResponseEntity<GPhotoSetting> addGPhoto(@RequestBody GPhotoSetting gPhotoSetting){
        int rowsAffected = gPhotoRepository.save(gPhotoSetting);
        if (rowsAffected ==0){
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.ok(gPhotoSetting);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GPhotoSetting> updateGPhoto(@PathVariable int id, 
            @RequestBody GPhotoSetting gPhotoSetting){
        int rowsAffected = gPhotoRepository.update(gPhotoSetting);
        if (rowsAffected ==0){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(gPhotoSetting);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteGPhoto(@PathVariable int id){
        int rowsAffected = gPhotoRepository.deleteById(id);
        if (rowsAffected == 0){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
     // return ResponseEntity.ok(String.format("The Google Photo folder with id %d is deleted", id));
    }
    
}
