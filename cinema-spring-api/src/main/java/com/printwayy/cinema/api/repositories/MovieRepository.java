package com.printwayy.cinema.api.repositories;

import com.printwayy.cinema.api.models.impl.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MovieRepository extends MongoRepository<Movie, String>{
    List<Movie> findMoviesByTitle(String title);
}
