package com.printwayy.cinema.api.models.impl;

import com.printwayy.cinema.api.models.Model;
import org.springframework.data.annotation.Id;

public class CinemaRoom implements Model {
    @Id
    private String id;
    private String name;
    private String chairs;

    public CinemaRoom() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getChairs() {
        return chairs;
    }

    public void setChairs(String chairs) {
        this.chairs = chairs;
    }
}
