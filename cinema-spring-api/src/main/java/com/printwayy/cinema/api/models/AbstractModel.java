package com.printwayy.cinema.api.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
public abstract class AbstractModel {
    @Id
    private String id;

}
