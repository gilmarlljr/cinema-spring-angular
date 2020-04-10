package com.printwayy.cinema.api.models.impl;

import com.printwayy.cinema.api.models.AbstractModel;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document
public class Movie extends AbstractModel {
    private String image;
    private String title;
    private String synopsis;
    private int duration;
    private String animationType;
    private String audioType;

}
