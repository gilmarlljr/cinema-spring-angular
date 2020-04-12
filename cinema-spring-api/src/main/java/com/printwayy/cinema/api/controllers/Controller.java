package com.printwayy.cinema.api.controllers;

import com.printwayy.cinema.api.config.Const;
import com.printwayy.cinema.api.models.AbstractModel;
import com.printwayy.cinema.api.responses.Response;
import com.printwayy.cinema.api.services.AbstractService;
import com.printwayy.cinema.api.services.exception.NotFoundExeption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

public abstract class Controller<T extends AbstractModel> {
    protected abstract AbstractService<T> getService();


    @Autowired
    PasswordEncoder passwordEncoder;

    @Secured({Const.ROLE_CLIENT, Const.ROLE_ADMIN})
    @GetMapping(path = "/all")
    public ResponseEntity<Response<List<T>>> listAll() {
        return ResponseEntity.ok(new Response<>(getService().listAll()));
    }

    @Secured({Const.ROLE_CLIENT, Const.ROLE_ADMIN})
    @GetMapping(path = "/{id}")
    public ResponseEntity<Response<T>> get(@PathVariable(name = "id") String id) {
        try {
            return ResponseEntity.ok(new Response<>(getService().get(id)));
        } catch (NotFoundExeption notFoundExeption) {
            List<String> errors = new ArrayList<>();
            errors.add("NotFound");
            return ResponseEntity.ok().body(new Response<>(errors));
        }
    }

    @Secured({Const.ROLE_ADMIN})
    @PostMapping
    public ResponseEntity<Response<T>> insert(@Valid @RequestBody T model, BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = new ArrayList<>();
            result.getAllErrors().forEach(erro -> errors.add(erro.getDefaultMessage()));
            return ResponseEntity.badRequest().body(new Response<>(errors));
        }
        return ResponseEntity.ok(new Response<>(getService().insert(model)));
    }

    @Secured({Const.ROLE_ADMIN})
    @PutMapping(path = "/{id}")
    public ResponseEntity<Response<T>> update(@PathVariable(name = "id") String id, @Valid @RequestBody T model, BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = new ArrayList<>();
            result.getAllErrors().forEach(erro -> errors.add(erro.getDefaultMessage()));
            return ResponseEntity.badRequest().body(new Response<>(errors));
        }
        model.setId(id);
        return ResponseEntity.ok(new Response<>(getService().update(model)));
    }

    @Secured({Const.ROLE_ADMIN})
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Response<Integer>> remove(@PathVariable(name = "id") String id) {
        getService().remove(id);
        return ResponseEntity.ok(new Response<>(1));
    }

}
