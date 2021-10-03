package com.moda.resource.web.controller;

import com.moda.resource.persistence.model.Clothes;
import com.moda.resource.service.ClothesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "${app.api.rest.prefix}/v1/clothes")
@Slf4j
public class ClothesController {

    private final ClothesService clothesService;

    @Autowired
    public ClothesController(ClothesService clothesService) {
        this.clothesService = clothesService;
    }

    @GetMapping("/{id}")
    public Clothes getById(@PathVariable String id){
        try {
            log.info("GET clothes id:{}", id);
            return clothesService.findById(id);
        } catch (Exception e){
            log.error(e.getMessage(), e);
        }
        return null;
    }

    @GetMapping
    public List<Clothes> getAllClothes(){
        log.info("GET all clothes");
        return (List<Clothes>) clothesService.findAll();
    }

    @GetMapping("/size")
    public int getClothesSize(){
        int size = getAllClothes().size();
        log.info("GET all clothes size size:{}", size);
        return size;
    }

    @PostMapping
    public ResponseEntity<?> addClothes(@RequestBody Clothes clothes){
        log.info("POST clothes clothes:{}", clothes);
        clothes.setPublished(new Date());
        clothesService.save(clothes);
        ResponseEntity<Object> build = ResponseEntity.ok().build();
        return build;
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateClothes(@PathVariable String id, @RequestBody Clothes clothes) throws Exception {
        log.info("PATCH clothes:{}", clothes);
        clothesService.save(clothes);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public void deleteAllClothes(){
        log.info("DELETE clothes");
        clothesService.deleteAll();
    }

    @DeleteMapping("/{id}")
    public void deleteClothesById(@PathVariable String id){
        log.info("DELETE clothes id:{}", id);
        clothesService.deleteById(id);
    }
}
