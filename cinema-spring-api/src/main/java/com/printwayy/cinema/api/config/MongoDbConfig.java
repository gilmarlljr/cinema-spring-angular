package com.printwayy.cinema.api.config;


import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackages = {"com.printwayy.cinema.api.repositories"})
public class MongoDbConfig {

}