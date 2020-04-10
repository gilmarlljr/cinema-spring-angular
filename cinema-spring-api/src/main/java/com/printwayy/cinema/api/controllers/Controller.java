package com.printwayy.cinema.api.controllers;

import com.printwayy.cinema.api.config.Const;
import com.printwayy.cinema.api.models.AbstractModel;
import com.printwayy.cinema.api.responses.Response;
import com.printwayy.cinema.api.services.Service;
import com.printwayy.cinema.api.services.exception.NotFoundExeption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public abstract class Controller<T extends AbstractModel> {

    protected abstract Service<T> getService();


    @Autowired
    PasswordEncoder passwordEncoder;

    @Secured({Const.ROLE_CLIENT, Const.ROLE_ADMIN})
    @GetMapping(path = "/all")
    public ResponseEntity<Response<List<T>>> listAll() {
        return ResponseEntity.ok(new Response<>(getService().listAll()));
    }

    @Secured({Const.ROLE_CLIENT, Const.ROLE_ADMIN})
    @GetMapping(params = { "page", "size","sort","column" })
    public ResponseEntity<Response<Page<T>>> listPaginated(@RequestParam("page") int page, @RequestParam("size") int size,@RequestParam("sort") String sort, @RequestParam("column") String column) {
        Page<T> resultPage = getService().findPaginated(page, size, Sort.Direction.fromString(Optional.of(sort).orElse("asc")), Optional.of(column).orElse("id"));
        if (page > resultPage.getTotalPages()) {
            ResponseEntity.ok(new Response<>(resultPage));
        }
        return ResponseEntity.ok(new Response<>(resultPage));
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
