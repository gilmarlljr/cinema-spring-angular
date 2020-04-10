package com.printwayy.cinema.api.services.impl;

import com.printwayy.cinema.api.models.impl.Room;
import com.printwayy.cinema.api.repositories.RoomRepository;
import com.printwayy.cinema.api.services.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.util.List;

@org.springframework.stereotype.Service
public class RoomService implements Service<Room> {
    @Override
    public Page<Room> findPaginated(int page, int size, Sort.Direction sort, String column) {
        return null;
    }

    @Autowired
    private RoomRepository repository;

    @Override
    public List<Room> listAll() {
        return this.repository.findAll();
    }

    @Override
    public Room get(String id) {
        return this.repository.findById(id).orElse(new Room());
    }

    @Override
    public Room insert(Room user) {
        return this.repository.insert(user);
    }

    @Override
    public Room update(Room user) {
        return this.repository.save(user);
    }

    @Override
    public void remove(String id) {
        this.repository.deleteById(id);
    }
}
