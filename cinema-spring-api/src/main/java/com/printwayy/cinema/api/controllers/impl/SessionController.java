package com.printwayy.cinema.api.controllers.impl;

import com.printwayy.cinema.api.config.Const;
import com.printwayy.cinema.api.controllers.Controller;
import com.printwayy.cinema.api.models.impl.MovieSession;
import com.printwayy.cinema.api.models.impl.Session;
import com.printwayy.cinema.api.responses.Response;
import com.printwayy.cinema.api.services.AbstractService;
import com.printwayy.cinema.api.services.impl.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/session")
public class SessionController extends Controller<Session> {
    @Autowired
    private SessionService service;


    @Override
    protected AbstractService<Session> getService() {
        return service;
    }

    @Secured({Const.ROLE_CLIENT, Const.ROLE_ADMIN})
    @GetMapping(path = "/movies")
    public ResponseEntity<Response<List<MovieSession>>> getMovies() {
        return ResponseEntity.ok(new Response<>(service.getMovieSession()));
    }

}
