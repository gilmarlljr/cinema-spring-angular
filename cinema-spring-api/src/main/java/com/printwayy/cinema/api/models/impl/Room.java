package com.printwayy.cinema.api.models.impl;

import com.printwayy.cinema.api.models.AbstractModel;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document
public class Room extends AbstractModel {
    private String name;
    private Integer chairs;
}
