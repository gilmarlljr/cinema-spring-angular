package com.printwayy.cinema.api.services;

import com.printwayy.cinema.api.models.AbstractModel;
import com.printwayy.cinema.api.services.exception.NotFoundExeption;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface Service<T extends AbstractModel> {

    Page<T> findPaginated(int page, int size, Sort.Direction sort, String column);

    List<T> listAll();

    T get(String id) throws NotFoundExeption;

    T insert(T model);

    T update(T model);

    void remove(String id);
}
