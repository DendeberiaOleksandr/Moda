package com.moda.resource.persistence.repository;

import com.moda.resource.persistence.model.Clothes;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface ClothesRepository extends PagingAndSortingRepository<Clothes, String> {
    @Override
    List<Clothes> findAll();
}
