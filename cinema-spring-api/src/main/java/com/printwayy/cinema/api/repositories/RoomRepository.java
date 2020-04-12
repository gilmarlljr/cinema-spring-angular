package com.printwayy.cinema.api.repositories;

import com.printwayy.cinema.api.models.impl.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RoomRepository extends MongoRepository<Room, String>{
    List<Room> findRoomsByName(String name);
}
