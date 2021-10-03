package com.moda.resource.service;

public interface CrudService<T, ID> {

    T findById(ID id) throws Exception;

    Iterable<T> findAll();

    void save(T t);

    void saveAll(Iterable<T> t);

    void deleteById(ID id);

    void deleteAll();

    void update(T t, ID id) throws Exception;
}
