package com.printwayy.cinema.api.controllers.impl;

import com.printwayy.cinema.api.config.Const;
import com.printwayy.cinema.api.controllers.Controller;
import com.printwayy.cinema.api.models.impl.User;
import com.printwayy.cinema.api.responses.Response;
import com.printwayy.cinema.api.services.AbstractService;
import com.printwayy.cinema.api.services.exception.NotFoundExeption;
import com.printwayy.cinema.api.services.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/api/user")
public class UserController extends Controller<User> {
    @Autowired
    private UserService service;

    @Override
    protected AbstractService<User> getService() {
        return service;
    }

    @PostMapping("/register")
    public ResponseEntity<Response<Boolean>> register(@Valid @RequestBody User model, BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = new ArrayList<>();
            result.getAllErrors().forEach(erro -> errors.add(erro.getDefaultMessage()));
            return ResponseEntity.badRequest().body(new Response<>(errors));
        }
        model.setAccessLevel(Const.ROLE_CLIENT);
        return ResponseEntity.ok(new Response<>(getService().insert(model) != null));
    }


    @GetMapping(params = {"email"})
    public ResponseEntity<Boolean> checkEmail(@RequestParam("email") String email) {
        return ResponseEntity.ok(service.getByEmail(email).isPresent());
    }

    @Secured({Const.ROLE_ADMIN, Const.ROLE_CLIENT})
    @PostMapping("/login")
    public ResponseEntity<Response<User>> login(@Valid @RequestBody User model, BindingResult result) throws NotFoundExeption {
        if (result.hasErrors()) {
            List<String> errors = new ArrayList<>();
            result.getAllErrors().forEach(erro -> errors.add(erro.getDefaultMessage()));
            return ResponseEntity.badRequest().body(new Response<>(errors));
        }
        User user = service.getByEmail(model.getEmail()).orElseThrow(NotFoundExeption::new);
        return ResponseEntity.ok(new Response<>(user));
    }

}
