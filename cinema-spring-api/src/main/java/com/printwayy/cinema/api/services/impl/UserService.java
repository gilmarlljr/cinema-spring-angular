package com.printwayy.cinema.api.services.impl;

import com.printwayy.cinema.api.models.impl.User;
import com.printwayy.cinema.api.repositories.UserRepository;
import com.printwayy.cinema.api.services.Service;
import com.printwayy.cinema.api.services.exception.NotFoundExeption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class UserService implements Service<User> {

    @Autowired
    private UserRepository repository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Page<User> findPaginated(int page, int size, Sort.Direction sort, String column) {
        return repository.findAll(PageRequest.of(page, size, sort, column));
    }

    @Override
    public List<User> listAll() {
        return this.repository.findAll();
    }

    @Override
    public User get(String id) throws NotFoundExeption {
        return this.repository.findById(id).orElse(getByEmail(id).orElseThrow(NotFoundExeption::new));
    }


    public Optional<User> getByEmail(String email) {
        return this.repository.findUsersByEmail(email).stream().findFirst();
    }

    @Override
    public User insert(User user) {
        if(!user.getPassword().startsWith("{bcrypt}")){
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return this.repository.insert(user);
    }

    @Override
    public User update(User user) {
        if(!user.getPassword().startsWith("{bcrypt}")){
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return this.repository.save(user);
    }

    @Override
    public void remove(String id) {
        this.repository.deleteById(id);
    }
}
