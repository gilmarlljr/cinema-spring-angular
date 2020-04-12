package com.printwayy.cinema.api.models.impl;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.printwayy.cinema.api.models.AbstractModel;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

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
public class MovieSession extends AbstractModel {
    @JsonFormat(pattern="yyyy-MM-dd HH:mm", locale = "pt-BR", timezone = "UTC")
    private LocalDateTime dateTime;
    private Movie movie;
    private Room room;
}


