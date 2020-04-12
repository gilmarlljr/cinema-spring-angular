package com.printwayy.cinema.api.controllers.impl;

import com.printwayy.cinema.api.config.Const;
import com.printwayy.cinema.api.controllers.Controller;
import com.printwayy.cinema.api.models.impl.Movie;
import com.printwayy.cinema.api.services.AbstractService;
import com.printwayy.cinema.api.services.impl.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/movie")
public class MovieController extends Controller<Movie> {
    @Autowired
    private MovieService service;


    @Override
    protected AbstractService<Movie> getService() {
        return service;
    }

    @Secured({Const.ROLE_ADMIN})
    @GetMapping(params = {"title"})
    public ResponseEntity<Boolean> checkTitle(@RequestParam("title") String title) {
        return ResponseEntity.ok(service.getByTitle(title).isPresent());
    }
}
