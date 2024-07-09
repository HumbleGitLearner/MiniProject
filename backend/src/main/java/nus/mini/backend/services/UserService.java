package nus.mini.backend.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import nus.mini.backend.jdbcRepositories.UserRepository;
import nus.mini.backend.models.User;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public int addUser(User user){
        user.setDateCreated(LocalDateTime.now());
        user.setLastMod(LocalDateTime.now());
        return userRepository.save(user);
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public User findById(int id){
        return userRepository.findById(id);
    }

    public int save(User user){
        return userRepository.save(user);
    }
    
    public int update(User user){
        return userRepository.update(user);
    }

    public int delete(int id){
        return userRepository.delete(id);
    }

 }
