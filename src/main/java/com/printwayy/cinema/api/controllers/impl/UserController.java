package com.printwayy.cinema.api.controllers.impl;

import com.printwayy.cinema.api.controllers.Controller;
import com.printwayy.cinema.api.models.impl.User;
import com.printwayy.cinema.api.services.Service;
import com.printwayy.cinema.api.services.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/users")
public class UserController extends Controller<User> {
    @Autowired
    private UserService service;


    @Override
    protected Service<User> getService() {
        return service;
    }
}
