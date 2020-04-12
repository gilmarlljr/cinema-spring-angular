package com.printwayy.cinema.api.services.impl;

import com.printwayy.cinema.api.models.impl.Room;
import com.printwayy.cinema.api.repositories.RoomRepository;
import com.printwayy.cinema.api.services.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

@org.springframework.stereotype.Service
public class RoomService extends AbstractService<Room> {

    @Autowired
    private RoomRepository repository;

    public Optional<Room> getByName(String name) {
        return this.repository.findRoomsByName(name).stream().findFirst();
    }


    @Override
    protected MongoRepository<Room, String> getRepository() {
        return this.repository;
    }
}
