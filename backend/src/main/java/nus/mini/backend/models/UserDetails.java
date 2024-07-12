package nus.mini.backend.models;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetails {

    private int id;
    private String username;
    private String password;
    private String token;
    private String given_name;
    private String last_name;
    private LocalDateTime lastMod;
    private LocalDateTime dateCreated;
    private String loginType;
    private int pemSettingId;
    private int receiptId;
    private int uploadsId;
    private String monthStmtId; //mongoDB _id
    private int gphotoId;
    private int hotmailId;
    private String descript;


}
