package com.printwayy.cinema.api.controllers.impl;

import com.printwayy.cinema.api.config.Const;
import com.printwayy.cinema.api.controllers.Controller;
import com.printwayy.cinema.api.models.impl.User;
import com.printwayy.cinema.api.services.Service;
import com.printwayy.cinema.api.services.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Base64;

@RestController
@RequestMapping(path = "/api/user")
public class UserController extends Controller<User> {
    @Autowired
    private UserService service;

    @Override
    protected Service<User> getService() {
        return service;
    }
}
