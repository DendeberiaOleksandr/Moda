package com.moda.resource.service;

import com.moda.resource.persistence.model.Clothes;
import com.moda.resource.persistence.repository.ClothesRepository;
import com.mongodb.lang.Nullable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;

@Service
@Slf4j
public class ClothesService implements CrudService<Clothes, String> {

    private ClothesRepository clothesRepository;

    @Autowired
    public ClothesService(ClothesRepository clothesRepository) {
        this.clothesRepository = clothesRepository;
    }

    @Override
    public Clothes findById(String id) throws Exception{
        return clothesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Can't find clothes with id: " + id));
    }

    public Iterable<Clothes> findAll() {
        return clothesRepository.findAll();
    }

    @Override
    public void save(Clothes clothes) {
        clothesRepository.save(clothes);
    }

    @Override
    public void saveAll(Iterable<Clothes> clothes) {
        clothesRepository.saveAll(clothes);
    }

    @Override
    public void deleteById(String id) {
        clothesRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        clothesRepository.deleteAll();
    }

    @Override
    public void update(Clothes clothes, String id) throws Exception {
        Clothes existed = findById(id);

        if(clothes.getId() != null){
            existed.setId(clothes.getId());
        }

        if(clothes.getName() != null){
            existed.setName(clothes.getName());
        }

        if(clothes.getBrand() != null){
            existed.setBrand(clothes.getBrand());
        }

        if(clothes.getCategory() != null){
            existed.setCategory(clothes.getCategory());
        }

        if(clothes.getCost() != null){
            existed.setCost(clothes.getCost());
        }

        if(clothes.getColor() != null){
            existed.setColor(clothes.getColor());
        }

        if(clothes.getPhoto() != null){
            existed.setPhoto(clothes.getPhoto());
        }

        if(clothes.getPreview() != null){
            existed.setPreview(clothes.getPreview());
        }

        if(clothes.getSize() != null){
            existed.setSize(clothes.getSize());
        }

        save(existed);
    }
}
