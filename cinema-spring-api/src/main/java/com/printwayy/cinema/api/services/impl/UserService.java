package com.printwayy.cinema.api.services.impl;

import com.printwayy.cinema.api.models.impl.User;
import com.printwayy.cinema.api.repositories.UserRepository;
import com.printwayy.cinema.api.services.AbstractService;
import com.printwayy.cinema.api.services.exception.NotFoundExeption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class UserService extends AbstractService<User> {
    @Autowired
    private UserRepository repository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public Optional<User> getByEmail(String email) {
        return this.repository.findUsersByEmail(email).stream().findFirst();
    }

    @Override
    protected MongoRepository<User, String> getRepository() {
        return this.repository;
    }

    @Override
    public User insert(User user) {
        if (!user.getPassword().startsWith("{bcrypt}")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return this.repository.insert(user);
    }

    @Override
    public User update(User user) {
        if (!user.getPassword().startsWith("{bcrypt}")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return this.repository.save(user);
    }


}
