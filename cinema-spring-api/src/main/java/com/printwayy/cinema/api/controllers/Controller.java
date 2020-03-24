package com.printwayy.cinema.api.controllers;

import com.printwayy.cinema.api.models.Model;
import com.printwayy.cinema.api.responses.Response;
import com.printwayy.cinema.api.services.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

public abstract class Controller<T extends Model> {

    protected abstract Service<T> getService();


    @GetMapping
    public ResponseEntity<Response<List<T>>> listAll() {
        return ResponseEntity.ok(new Response<>(getService().listAll()));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Response<T>> get(String id) {
        return ResponseEntity.ok(new Response<>(getService().get(id)));
    }

    @PostMapping
    public ResponseEntity<Response<T>> insert(@Valid @RequestBody T model, BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = new ArrayList<>();
            result.getAllErrors().forEach(erro -> errors.add(erro.getDefaultMessage()));
            return ResponseEntity.badRequest().body(new Response<>(errors));
        }
        return ResponseEntity.ok(new Response<>(getService().insert( model)));
    }

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

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Response<Integer>> remove(@PathVariable(name = "id") String id) {
        getService().remove(id);
        return ResponseEntity.ok(new Response<>(1));
    }

}
