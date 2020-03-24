package com.printwayy.cinema.api.services.impl;

import com.printwayy.cinema.api.models.impl.MovieSession;
import com.printwayy.cinema.api.models.impl.User;
import com.printwayy.cinema.api.repositories.MovieSessionRepository;
import com.printwayy.cinema.api.services.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@org.springframework.stereotype.Service
public class MovieSessionService implements Service<MovieSession> {

    @Autowired
    private MovieSessionRepository repository;

    @Override
    public List<MovieSession> listAll() {
        return this.repository.findAll();
    }

    @Override
    public MovieSession get(String id) {
        return this.repository.findById(id).orElse(new MovieSession());
    }

    @Override
    public MovieSession insert(MovieSession user) {
        return this.repository.insert(user);
    }

    @Override
    public MovieSession update(MovieSession user) {
        return this.repository.save(user);
    }

    @Override
    public void remove(String id) {
        this.repository.deleteById(id);
    }
}
