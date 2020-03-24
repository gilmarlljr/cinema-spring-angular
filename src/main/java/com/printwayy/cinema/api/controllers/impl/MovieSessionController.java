package com.printwayy.cinema.api.controllers.impl;

import com.printwayy.cinema.api.controllers.Controller;
import com.printwayy.cinema.api.models.impl.MovieSession;
import com.printwayy.cinema.api.services.Service;
import com.printwayy.cinema.api.services.impl.MovieSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/session")
public class MovieSessionController extends Controller<MovieSession> {
    @Autowired
    private MovieSessionService service;


    @Override
    protected Service<MovieSession> getService() {
        return service;
    }
}
