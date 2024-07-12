package nus.mini.backend.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nus.mini.backend.models.EnumTypes.LoginType ;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private int id;
    @NotBlank(message = "email is mandatory")
    @Email(message = "Email should be valid")
    private String email;
    private String password;
    private String token;
    private String secret;
    private String givenName;
    private String lastName;
    private LoginType loginType;
    private String mobile;
    private Boolean notifTelegram;
    private Boolean notifEmail;
    private Boolean scanEmail;
    private long exp;
}
