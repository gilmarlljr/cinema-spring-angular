package com.printwayy.cinema.api.controllers.impl;

import com.printwayy.cinema.api.controllers.Controller;
import com.printwayy.cinema.api.models.impl.Movie;
import com.printwayy.cinema.api.services.Service;
import com.printwayy.cinema.api.services.impl.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/movie")
public class MovieController extends Controller<Movie> {
    @Autowired
    private MovieService service;


    @Override
    protected Service<Movie> getService() {
        return service;
    }
}
