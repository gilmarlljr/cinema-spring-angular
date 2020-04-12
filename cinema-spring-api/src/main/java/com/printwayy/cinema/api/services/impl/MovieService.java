package com.printwayy.cinema.api.services.impl;

import com.printwayy.cinema.api.models.impl.Movie;
import com.printwayy.cinema.api.repositories.MovieRepository;
import com.printwayy.cinema.api.services.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

@org.springframework.stereotype.Service
public class MovieService extends AbstractService<Movie> {
    @Autowired
    private MovieRepository repository;


    public Optional<Movie> getByTitle(String title) {
        return this.repository.findMoviesByTitle(title).stream().findFirst();
    }

    @Override
    protected MongoRepository<Movie, String> getRepository() {
        return this.repository;
    }
}
