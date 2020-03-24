package com.printwayy.cinema.api.services;

import com.printwayy.cinema.api.models.Model;

import java.util.List;

public interface Service<T extends Model> {

    List<T> listAll();

    T get(String id);

    T insert(T model);

    T update(T model);

    void remove(String id);
}
