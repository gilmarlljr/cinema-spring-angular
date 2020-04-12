package com.printwayy.cinema.api.services;

import com.printwayy.cinema.api.models.AbstractModel;
import com.printwayy.cinema.api.models.impl.Session;
import com.printwayy.cinema.api.repositories.MovieSessionRepository;
import com.printwayy.cinema.api.services.exception.NotFoundExeption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public abstract class Service<T extends AbstractModel> {
    protected abstract MongoRepository<T, String> getRepository();

    public Page<T> findPaginated(int page, int size, Sort.Direction sort, String column) {
        return null;
    }

    private MovieSessionRepository repository;

    public List<T> listAll() {
        return getRepository().findAll();
    }

    public T get(String id) throws NotFoundExeption {
        return getRepository().findById(id).orElseThrow(NotFoundExeption::new);
    }
    public T insert(T model) {
        return getRepository().insert(model);
    }

    public T update(T model) {
        return getRepository().save(model);
    }

    public void remove(String id) {
        getRepository().deleteById(id);
    }
}
