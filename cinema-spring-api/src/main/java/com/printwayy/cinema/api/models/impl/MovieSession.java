package com.printwayy.cinema.api.models.impl;

import com.printwayy.cinema.api.models.AbstractModel;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document
public class MovieSession extends AbstractModel {
    private LocalDate date;
    private LocalTime time;
    private Movie movie;
    private Room room;
    private Map<Integer,User> userChairs;

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class UserSession {
        private User user;
        private Integer chair;
    }
}


