package nus.mini.backend.models;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nus.mini.backend.models.EnumTypes.LoginType;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {

   private static final long serialVersionUID = 1L;

   private int id;

   @NotBlank(message = "email is mandatory")
   @Email(message = "Email should be valid") 
   private String email;

   //password and token are unknown if loggin from a third party
   private String password; // password should be hashed
   private String token;
   private String secret;
   private String first_name;
   private String last_name;
   private LocalDateTime lastMod;
   private LocalDateTime dateCreated;
   private LoginType loginType;
   private String descript;
   private String mobile;
   private Boolean notif_telegram;
   private Boolean notif_email;
   private Boolean scan_email;
   private long exp; // expiration time

}
