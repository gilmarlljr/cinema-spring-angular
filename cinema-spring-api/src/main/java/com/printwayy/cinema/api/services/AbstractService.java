package com.printwayy.cinema.api.services;

import com.printwayy.cinema.api.models.AbstractModel;
import com.printwayy.cinema.api.services.exception.NotFoundExeption;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public abstract class AbstractService<T extends AbstractModel> {

    protected abstract MongoRepository<T, String> getRepository();

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
