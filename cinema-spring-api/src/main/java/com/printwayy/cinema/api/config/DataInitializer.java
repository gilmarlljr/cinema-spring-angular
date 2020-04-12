package com.printwayy.cinema.api.config;

import com.printwayy.cinema.api.models.impl.Session;
import com.printwayy.cinema.api.models.impl.User;
import com.printwayy.cinema.api.repositories.MovieRepository;
import com.printwayy.cinema.api.repositories.RoomRepository;
import com.printwayy.cinema.api.repositories.SessionRepository;
import com.printwayy.cinema.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class DataInitializer implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    UserRepository userRepository;

    @Autowired
    SessionRepository sessionRepository;

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    RoomRepository roomRepository;


    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent arg0) {
        createSession("2020-04-20 20:30");
        createSession("2020-04-15 10:30");
        createSession("2020-04-15 20:30");
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            createUser("Admin", "admin@admin", passwordEncoder.encode("admin"), Const.ROLE_ADMIN);
            createUser("Client", "client@client", passwordEncoder.encode("client"), Const.ROLE_CLIENT);
            for (int i = 0; i < 200; i++) {
                createUser("Test - "+i, "test"+i+"@test", passwordEncoder.encode("test"), Const.ROLE_CLIENT);
            }
        }

    }

    public void createUser(String name, String email, String password, String roleName) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setAccessLevel(roleName);
        user.setImage("data:image/jpeg;base64,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");
        userRepository.save(user);
    }

    public void createSession(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(date, formatter);
        Session session = new Session();
        session.setDateTime(dateTime);
        session.setRoomId(roomRepository.findAll().get(0).getId());
        session.setMovieId(movieRepository.findAll().get(0).getId());
        sessionRepository.save(session);
    }

}