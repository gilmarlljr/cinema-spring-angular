package com.printwayy.cinema.api.services.impl;

import com.printwayy.cinema.api.models.impl.Movie;
import com.printwayy.cinema.api.models.impl.MovieSession;
import com.printwayy.cinema.api.repositories.MovieRepository;
import com.printwayy.cinema.api.repositories.UserRepository;
import com.printwayy.cinema.api.services.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.util.List;

@org.springframework.stereotype.Service
public class MovieService implements Service<Movie> {
    @Override
    public Page<Movie> findPaginated(int page, int size, Sort.Direction sort, String column) {
        return  null;
    }
    @Autowired
    private MovieRepository repository;

    @Override
    public List<Movie> listAll() {
        return this.repository.findAll();
    }

    @Override
    public Movie get(String id) {
        return this.repository.findById(id).orElse(new Movie());
    }

    @Override
    public Movie insert(Movie user) {
        return this.repository.insert(user);
    }

    @Override
    public Movie update(Movie user) {
        return this.repository.save(user);
    }

    @Override
    public void remove(String id) {
        this.repository.deleteById(id);
    }
}
