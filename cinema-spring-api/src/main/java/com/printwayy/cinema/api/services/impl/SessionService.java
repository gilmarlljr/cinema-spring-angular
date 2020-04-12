package com.printwayy.cinema.api.services.impl;

import com.mongodb.BasicDBObject;
import com.printwayy.cinema.api.models.AbstractModel;
import com.printwayy.cinema.api.models.impl.Movie;
import com.printwayy.cinema.api.models.impl.MovieSession;
import com.printwayy.cinema.api.models.impl.Room;
import com.printwayy.cinema.api.models.impl.Session;
import com.printwayy.cinema.api.repositories.MovieRepository;
import com.printwayy.cinema.api.repositories.RoomRepository;
import com.printwayy.cinema.api.repositories.SessionRepository;
import com.printwayy.cinema.api.services.AbstractService;
import com.printwayy.cinema.api.services.exception.NotFoundExeption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.*;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@org.springframework.stereotype.Service
public class SessionService extends AbstractService<Session> {
    @Autowired
    private SessionRepository repository;
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private RoomRepository roomRepository;

    @Override
    protected MongoRepository<Session, String> getRepository() {
        return this.repository;
    }

    @Override
    public List<Session> listAll() {
        return loadMovieAndRoom(super.listAll().toArray(Session[]::new));
    }

    private List<Session> loadMovieAndRoom(Session... session) {
        Map<String, AbstractModel> map = new HashMap<>();
        for (Session s : session) {
            if (map.get(s.getRoomId()) == null) {
                map.put(s.getRoomId(), roomRepository.findById(s.getRoomId()).get());
            }
            s.setRoom((Room) map.get(s.getRoomId()));
            if (map.get(s.getMovieId()) == null) {
                map.put(s.getMovieId(), movieRepository.findById(s.getMovieId()).get());
            }
            s.setMovie((Movie) map.get(s.getMovieId()));
        }
        return Arrays.asList(session);
    }

    @Override
    public Session insert(Session model) {
        if(model.getMovie()!=null){
            model.setMovieId(model.getMovie().getId());
        }
        if(model.getRoom()!=null){
            model.setRoomId(model.getRoom().getId());
        }
        return super.insert(model);
    }

    @Override
    public Session update(Session model) {
        if(model.getMovie()!=null){
            model.setMovieId(model.getMovie().getId());
        }
        if(model.getRoom()!=null){
            model.setRoomId(model.getRoom().getId());
        }
        return super.update(model);
    }

    @Override
    public Session get(String id) throws NotFoundExeption {
        return loadMovieAndRoom(super.get(id)).stream().findFirst().get();
    }

    @Autowired
    MongoTemplate mongoTemplate;

    public List<MovieSession> getMovieSession() {
        Map<String, AbstractModel> map = new HashMap<>();
        Aggregation agg = newAggregation(
                group("movieId").push(new BasicDBObject("dateTime", "$dateTime").append("roomId", "$roomId")
                        .append("_id", "$_id")).as("sessions")
        );
        AggregationResults<MovieSession> groupResults = mongoTemplate.aggregate(agg, Session.class, MovieSession.class);
        List<MovieSession> result = groupResults.getMappedResults();
        result.forEach(movieSession -> {
            if (map.get(movieSession.getId()) == null) {
                map.put(movieSession.getId(), movieRepository.findById(movieSession.getId()).get());
            }
            movieSession.setMovie((Movie) map.get(movieSession.getId()));
            for (Session s : movieSession.getSessions()) {
                if (map.get(s.getRoomId()) == null) {
                    map.put(s.getRoomId(), roomRepository.findById(s.getRoomId()).get());
                }
                s.setRoom((Room) map.get(s.getRoomId()));
            }
        });
        return result;

    }
}
