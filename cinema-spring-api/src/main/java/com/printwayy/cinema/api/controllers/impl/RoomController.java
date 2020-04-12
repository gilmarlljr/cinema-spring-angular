package com.printwayy.cinema.api.controllers.impl;

import com.printwayy.cinema.api.config.Const;
import com.printwayy.cinema.api.controllers.Controller;
import com.printwayy.cinema.api.models.impl.Room;
import com.printwayy.cinema.api.services.AbstractService;
import com.printwayy.cinema.api.services.impl.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/room")
public class RoomController extends Controller<Room> {
    @Autowired
    private RoomService service;


    @Override
    protected AbstractService<Room> getService() {
        return service;
    }
    @Secured({Const.ROLE_ADMIN})
    @GetMapping(params = {"name"})
    public ResponseEntity<Boolean> checkName(@RequestParam("name") String name) {
        return ResponseEntity.ok(service.getByName(name).isPresent());
    }
}
