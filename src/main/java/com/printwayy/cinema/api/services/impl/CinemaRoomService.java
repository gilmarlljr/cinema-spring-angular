package com.printwayy.cinema.api.services.impl;

import com.printwayy.cinema.api.models.impl.CinemaRoom;
import com.printwayy.cinema.api.models.impl.User;
import com.printwayy.cinema.api.repositories.CinemaRoomRepository;
import com.printwayy.cinema.api.services.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@org.springframework.stereotype.Service
public class CinemaRoomService implements Service<CinemaRoom> {

    @Autowired
    private CinemaRoomRepository repository;

    @Override
    public List<CinemaRoom> listAll() {
        return this.repository.findAll();
    }

    @Override
    public CinemaRoom get(String id) {
        return this.repository.findById(id).orElse(new CinemaRoom());
    }

    @Override
    public CinemaRoom insert(CinemaRoom user) {
        return this.repository.insert(user);
    }

    @Override
    public CinemaRoom update(CinemaRoom user) {
        return this.repository.save(user);
    }

    @Override
    public void remove(String id) {
        this.repository.deleteById(id);
    }
}
