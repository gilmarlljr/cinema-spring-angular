package com.printwayy.cinema.api.repositories;

import com.printwayy.cinema.api.models.impl.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findUsersByEmail(String email);
}
