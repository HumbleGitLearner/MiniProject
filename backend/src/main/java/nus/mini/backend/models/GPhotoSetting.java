package nus.mini.backend.models;

import java.io.Serializable;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GPhotoSetting implements Serializable  {
    
//When to Implement Serializable
//1. Persistence: If you plan to save the state of objects to a file, database, or any other persistent storage.
//2. Distributed Systems: If you need to transfer objects over a network, such as in remote method invocation (RMI), web services, or messaging systems.
//3. Session Management: If your objects will be stored in HTTP sessions, such as in web applications where session data is serialized and saved.
//4. Caching: If you need to cache objects, especially in distributed cache systems.

    private static final long serialVersionUID = 1L;
    
    private int id;

    @NotBlank(message = "userId is mandatory")
    private int userId=0;

    private String filepath="";


}
