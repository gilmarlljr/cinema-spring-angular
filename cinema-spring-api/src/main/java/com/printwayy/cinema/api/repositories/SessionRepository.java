package com.printwayy.cinema.api.repositories;

import com.printwayy.cinema.api.models.impl.Session;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SessionRepository extends MongoRepository<Session, String>{
}
