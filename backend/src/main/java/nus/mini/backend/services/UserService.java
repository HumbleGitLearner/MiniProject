package nus.mini.backend.services;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import nus.mini.backend.jdbcRepositories.UserRepository;
import nus.mini.backend.models.UserDTO;
import nus.mini.backend.models.UserData;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserData mapToUserData(UserDTO userDTO) {
        UserData userData = new UserData();
        userData.setId(userDTO.getId());
        userData.setEmail(userDTO.getEmail());
        userData.setPassword(userDTO.getPassword());
        userData.setToken(userDTO.getToken());
        userData.setSecret(userDTO.getSecret());
        userData.setGivenName(userDTO.getGivenName());
        userData.setLastName(userDTO.getLastName());  
        userData.setLoginType(userDTO.getLoginType());
        userData.setMobile(userDTO.getMobile());
        userData.setNotifTelegram(userDTO.getNotifTelegram());
        userData.setNotifEmail(userDTO.getNotifEmail());
        userData.setScanEmail(userDTO.getScanEmail());
        userData.setExp(userDTO.getExp());
        return userData;
    }

    public UserDTO mapToUserDTO(UserData userData) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userData.getId());
        userDTO.setEmail(userData.getEmail());
        userDTO.setPassword(userData.getPassword());
        userDTO.setToken(userData.getToken());
        userDTO.setSecret(userData.getSecret());
        userDTO.setGivenName(userData.getGivenName());
        userDTO.setLastName(userData.getLastName());  
        userDTO.setLoginType(userData.getLoginType());
        userDTO.setMobile(userData.getMobile());
        userDTO.setNotifTelegram(userData.getNotifTelegram());
        userDTO.setNotifEmail(userData.getNotifEmail());
        userDTO.setScanEmail(userData.getScanEmail());
        userDTO.setExp(userData.getExp());
        return userDTO;
    }


    public int addUser(UserDTO user) throws DataAccessException, SQLException{
        UserData userData = mapToUserData(user);
        userData.setDateCreated(LocalDateTime.now());
        userData.setLastMod(LocalDateTime.now());
        userData.setDescript("User added");
        return userRepository.save(userData);
    }

    public List<UserDTO> findAll() throws DataAccessException, SQLException{
        List<UserData> userData = userRepository.findAll();
        List<UserDTO> usersDTO = userData.stream().map(user -> {
            return mapToUserDTO(user);
        }).collect(Collectors.toList());
        return usersDTO;
    }

    public Optional<UserDTO> findById(int id) throws DataAccessException, SQLException  {
        Optional<UserData> result = userRepository.findById(id);
         if (result.isEmpty())
            return Optional.empty();
        return Optional.of(mapToUserDTO(result.get()));
    }
    public Optional<UserData> findDataById(int id) throws DataAccessException, SQLException{
        Optional<UserData> result = userRepository.findById(id);
         if (result.isEmpty())
            return Optional.empty();
        return Optional.of(result.get());
    }

    public Optional<UserDTO> findByEmail(String email) throws DataAccessException, SQLException{
        Optional<UserData> result = userRepository.findByEmail(email);
        if (result.isEmpty())
            return Optional.empty();
        return Optional.of(mapToUserDTO(result.get()));
    }

    public Optional<UserData> findDataByEmail(String email) throws DataAccessException, SQLException{
        Optional<UserData> result = userRepository.findByEmail(email);
         if (result.isEmpty())
            return Optional.empty();
        return Optional.of(result.get());
    }


    public int save(UserDTO user) throws DataAccessException, SQLException{
        return userRepository.save(mapToUserData(user));
    }
    
    public int update(UserDTO user) throws DataAccessException, SQLException{
        Optional<UserData> result= findDataById(user.getId());
        if (result.isEmpty())
            return 0;
        LocalDateTime dateCreated = result.get().getDateCreated();
        String descript = result.get().getDescript();
        UserData userData= mapToUserData(user);
        userData.setDateCreated(dateCreated);
        userData.setDescript(descript);
        userData.setLastMod(LocalDateTime.now());
        return userRepository.update(userData);

    }

    public int delete(int id) throws DataAccessException, SQLException{
        return userRepository.delete(id);
     }


 }
