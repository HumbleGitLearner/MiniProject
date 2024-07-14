package nus.mini.backend.controllers;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import nus.mini.backend.models.UserDTO;
import nus.mini.backend.models.UserData;
import nus.mini.backend.services.UserService;


@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    @Autowired
    private UserService userService;
 
    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getAllUsers() 
                        throws DataAccessException, SQLException {
        List<UserDTO> users = userService.findAll();
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
         } else {
            return ResponseEntity.ok(users);
       }   
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable int id)
                                throws DataAccessException, SQLException {
        Optional<UserDTO>  user = userService.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(user.get()) ;
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logoutUserById(@RequestParam int id)
                                throws DataAccessException, SQLException {
        Optional<UserDTO>  user = userService.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            UserDTO userDto = user.get();
            //clear token
            userDto.setToken("");
            userDto.setExp(0);
            userService.update(userDto);
            return ResponseEntity.noContent().build();
        }
    }


    @PostMapping("/login") //TODO password hashing
    public ResponseEntity<UserDTO> authenticate(@Valid @RequestBody UserDTO user) 
                                    throws DataAccessException, SQLException {
        Optional<UserDTO>userDto = userService.findByEmail(user.getEmail());
        if (userDto.isEmpty()){
            return ResponseEntity.notFound().build();
        }        
        if (user.getPassword().equals(userDto.get().getPassword())){
            return ResponseEntity.ok(userDto.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
 
    @PostMapping("/recover")
    public ResponseEntity<UserDTO> recoverPWd(@Valid @RequestBody UserDTO user) 
                                    throws DataAccessException, SQLException {
        System.out.println("recovering password>>> " + user.getEmail());
        Optional<UserDTO>userOpt= userService.findByEmail(user.getEmail());
        if (userOpt.isEmpty()){
            return ResponseEntity.notFound().build();
        }        
        UserDTO userDto = userOpt.get(); 
        if ((user.getGivenName().equals(userDto.getGivenName())) 
            && (user.getSecret().equals(userDto.getSecret()))){
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
 
    @PostMapping("/add")
 //   public ResponseEntity<UserDTO> addUser(@Valid @RequestBody UserDTO user) {
    public ResponseEntity<Integer> addUser(@Valid @RequestBody UserDTO user) 
                                    throws DataAccessException, SQLException {
        Optional<UserData>  userOpt = userService.findDataByEmail(user.getEmail());
        if (userOpt.isPresent()){
   //         System.out.println("User already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(userOpt.get().getId());
        }
  //      System.out.println("User does not exist");
        int id=0;
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        long tmrwSec= tomorrow.atStartOfDay(ZoneId.systemDefault()).toEpochSecond();
        user.setExp(tmrwSec);;
        if ((id = userService.addUser(user))!=0){
            user.setId(id);
  //          return ResponseEntity.ok(user);
            return ResponseEntity.ok(id);
        } else {
            return ResponseEntity.internalServerError().build();
        }
     }
 
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable int id
        , @Valid @RequestBody UserDTO user) throws DataAccessException, SQLException {
        user.setId(id);
        int update=userService.update(user);
        if (update==0){
            return ResponseEntity.notFound().build(); //returning 404 Not Found
        }
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable int id) 
                    throws DataAccessException, SQLException {
        int result = userService.delete(id);
        if (result ==0 ){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
    

}
