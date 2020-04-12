package com.printwayy.cinema.api.models.impl;

import com.printwayy.cinema.api.models.AbstractModel;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document
public class User extends AbstractModel {
    private String name;
    private String email;
    private String password;
    private String accessLevel;
    private String image;
}
