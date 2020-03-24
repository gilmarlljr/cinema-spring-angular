package com.printwayy.cinema.api.services.impl;

import com.printwayy.cinema.api.models.impl.User;
import com.printwayy.cinema.api.repositories.UserRepository;
import com.printwayy.cinema.api.services.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@org.springframework.stereotype.Service
public class UserService implements Service<User> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> listAll() {
        return this.userRepository.findAll();
    }

    @Override
    public User get(String id) {
        return this.userRepository.findById(id).orElse(new User());
    }

    @Override
    public User insert(User user) {
        return this.userRepository.insert(user);
    }

    @Override
    public User update(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public void remove(String id) {
        this.userRepository.deleteById(id);
    }
}
