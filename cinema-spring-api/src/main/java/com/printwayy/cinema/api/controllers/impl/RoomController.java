package com.printwayy.cinema.api.controllers.impl;

import com.printwayy.cinema.api.controllers.Controller;
import com.printwayy.cinema.api.models.impl.Room;
import com.printwayy.cinema.api.services.Service;
import com.printwayy.cinema.api.services.impl.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/room")
public class RoomController extends Controller<Room> {
    @Autowired
    private RoomService service;


    @Override
    protected Service<Room> getService() {
        return service;
    }
}
