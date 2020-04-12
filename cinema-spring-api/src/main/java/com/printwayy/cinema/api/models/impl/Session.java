package com.printwayy.cinema.api.models.impl;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.printwayy.cinema.api.models.AbstractModel;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Transient;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document
public class Session extends AbstractModel {
    @JsonFormat(timezone = "UTC")
    private LocalDateTime dateTime;
    @Transient
    private Room room;
    @Transient
    private Movie movie;
    private String roomId;
    private String movieId;
}


