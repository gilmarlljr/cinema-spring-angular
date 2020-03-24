package com.printwayy.cinema.api.controllers.impl;

import com.printwayy.cinema.api.controllers.Controller;
import com.printwayy.cinema.api.models.impl.CinemaRoom;
import com.printwayy.cinema.api.models.impl.Movie;
import com.printwayy.cinema.api.services.Service;
import com.printwayy.cinema.api.services.impl.CinemaRoomService;
import com.printwayy.cinema.api.services.impl.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/room")
public class CinemaRoomController extends Controller<CinemaRoom> {
    @Autowired
    private CinemaRoomService service;


    @Override
    protected Service<CinemaRoom> getService() {
        return service;
    }
}
