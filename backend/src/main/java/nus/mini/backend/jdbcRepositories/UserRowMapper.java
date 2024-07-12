package nus.mini.backend.jdbcRepositories;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;

import nus.mini.backend.models.EnumTypes.LoginType;
import nus.mini.backend.models.UserData;

public class UserRowMapper implements RowMapper<UserData>{

    @Override
    public UserData mapRow(@NonNull ResultSet rs, int rowNum ) throws SQLException{
        UserData user = new UserData();
        user.setId(rs.getInt("id"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setToken(rs.getString("token"));
        user.setSecret(rs.getString("secret"));
        user.setGivenName(rs.getString("given_name"));
        user.setLastName(rs.getString("last_name"));
        user.setLastMod(rs.getTimestamp("last_mod").toLocalDateTime());
        user.setDateCreated(rs.getTimestamp("date_created").toLocalDateTime());
        user.setLoginType(LoginType.valueOf(rs.getString("login_type")));
        user.setDescript(rs.getString("descript"));
        user.setMobile(rs.getString("mobile"));
        user.setNotifTelegram(rs.getBoolean("notif_telegram"));
        user.setNotifEmail(rs.getBoolean("notif_email"));
        user.setScanEmail(rs.getBoolean("scan_email"));
        user.setExp(rs.getLong("exp"));
        return user;
    }
}
