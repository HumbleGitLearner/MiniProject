package nus.mini.backend.jdbcRepositories;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;

import nus.mini.backend.models.EnumTypes.LoginType;
import nus.mini.backend.models.User;

public class UserRowMapper implements RowMapper<User>{

    @Override
    public User mapRow(@NonNull ResultSet rs, int rowNum ) throws SQLException{
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setToken(rs.getString("token"));
        user.setSecret(rs.getString("secret"));
        user.setFirst_name(rs.getString("first_name"));
        user.setLast_name(rs.getString("last_name"));
        user.setLastMod(rs.getTimestamp("lastMod").toLocalDateTime());
        user.setDateCreated(rs.getTimestamp("dateCreated").toLocalDateTime());
        user.setLoginType(LoginType.valueOf(rs.getString("loginType")));
        user.setDescript(rs.getString("descript"));
        user.setMobile(rs.getString("mobile"));
        user.setNotif_telegram(rs.getBoolean("notif_telegram"));
        user.setNotif_email(rs.getBoolean("notif_email"));
        user.setScan_email(rs.getBoolean("scan_email"));
        user.setExp(rs.getLong("exp"));
        return user;
    }
}
