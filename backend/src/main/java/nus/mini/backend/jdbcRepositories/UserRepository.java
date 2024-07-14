package nus.mini.backend.jdbcrepositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import jakarta.validation.Valid;
import nus.mini.backend.models.UserData;

// import org.springframework.data.jpa.repository.JpaRepository;
// import nus.miniproject.backend.models.UserData;
// public interface UserRepository extends JpaRepository<UserData, Integer>{}

@Repository
public class UserRepository{
    
    @Autowired
    JdbcTemplate jdbcTemplate;

    private final String FIND_ALL_USERS="SELECT * from users";
    private final String FIND_USER_BY_ID="SELECT * from users where users.id =?";
    private final String FIND_USER_BY_EMAIL="SELECT * from users where users.email =?";
    private final String INSERT_USER= """
        INSERT INTO users (email, password, token, secret, given_name, last_name,
         last_mod, date_created, login_type, descript, mobile, notif_telegram
         ,notif_email, scan_email, exp) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    """;
    private final String UPDATE_USER ="""
        UPDATE users SET email=?, password=?, token=?, secret=?, given_name=?, 
        last_name=?, last_mod=?, date_created=?, login_type=?, descript=?
        , mobile=?, notif_telegram=?, notif_email=?, scan_email=?, exp=? where id=?
    """;
    final String DELETE_USER= "delete from users where id=?";

    private final UserRowMapper rowMapper = new UserRowMapper();

    // public Boolean save(UserData user){
    //     Boolean bSaved=false;

    //     PreparedStatementCallback<Boolean> psc= new PreparedStatementCallback<Boolean>(){
    //         @Override
    //         public Boolean doInPreparedStatement(@NonNull PreparedStatement ps) throws SQLException, DataAccessException{
    //             ps.setString(1, user.getFirst_name());
    //             ps.setString(2, user.getLast_name());
    //             ps.setTimestamp(3, Timestamp.valueOf(user.getLastMod()));
    //             ps.setTimestamp(4, Timestamp.valueOf(user.getDateCreated()));
    //             ps.setString(5, user.getDescript());
    //             ps.setObject(6, user.getLoginType().name());
    //             Boolean rslt=ps.execute();
    //              return rslt;
    //         }
    //     };
    //     bSaved= jdbcTemplate.execute(insertSQL, psc);
    //     return bSaved;
    // }

    public int save(@Valid UserData user) throws DataAccessException, SQLException{
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(new PreparedStatementCreator(){
            @SuppressWarnings("null")
            @Override
            public PreparedStatement createPreparedStatement(@NonNull Connection con) throws SQLException{
                PreparedStatement pst = con.prepareStatement(INSERT_USER, new String[]{"id"});
                if (pst == null) throw new SQLException("Failed to create a PreparedStatement");    
                pst.setString(1, user.getEmail());
                pst.setString(2, user.getPassword());
                pst.setString(3, user.getToken());
                pst.setString(4, user.getSecret());
                pst.setString(5, user.getGivenName());
                pst.setString(6, user.getLastName());
                pst.setTimestamp(7, Timestamp.valueOf(user.getLastMod()));
                pst.setTimestamp(8, Timestamp.valueOf(user.getDateCreated()));
                pst.setObject(9, user.getLoginType().name());
                pst.setString(10, user.getDescript());
                pst.setString(11, user.getMobile());
                pst.setBoolean(12,user.getNotifTelegram());
                pst.setBoolean(13, user.getNotifEmail());
                pst.setBoolean(14, user.getScanEmail());  
                pst.setLong(15, user.getExp());   
                return pst;
            }
        }, keyHolder);
        Number key = keyHolder.getKey();
        if (key == null) return 0;
        return key.intValue();
    }

    public int update(UserData user) throws DataAccessException, SQLException {
        int iUpdated=0;
        PreparedStatementSetter pss = new PreparedStatementSetter(){
            @Override
            public void setValues(@NonNull PreparedStatement pst) throws SQLException{
                pst.setString(1, user.getEmail());
                pst.setString(2, user.getPassword());
                pst.setString(3, user.getToken());
                pst.setString(4, user.getSecret());
                pst.setString(5, user.getGivenName());
                pst.setString(6, user.getLastName());
                pst.setTimestamp(7, Timestamp.valueOf(user.getLastMod()));
                pst.setTimestamp(8, Timestamp.valueOf(user.getDateCreated()));
                pst.setObject(9, user.getLoginType().name());
                pst.setString(10, user.getDescript());
                pst.setString(11, user.getMobile());
                pst.setBoolean(12,user.getNotifTelegram());
                pst.setBoolean(13, user.getNotifEmail());
                pst.setBoolean(14, user.getScanEmail());
                pst.setLong(15, user.getExp());
                pst.setInt(16, user.getId());
           }
        };
        iUpdated=jdbcTemplate.update(UPDATE_USER, pss);
        return iUpdated;
    }

    public int delete(int id) throws DataAccessException{
        int result=0;
        try{
            result= jdbcTemplate.update(DELETE_USER, id);
        } catch (EmptyResultDataAccessException e){
            result=0;
        }
        return result;
    }

    public Optional<UserData> findById(Integer userId) throws DataAccessException, SQLException{
        try {
            UserData userData = jdbcTemplate.queryForObject(FIND_USER_BY_ID, rowMapper, userId);
            return Optional.ofNullable(userData);
        } catch (EmptyResultDataAccessException ex) {
            return Optional.empty();
        }
    }

    public Optional<UserData> findByEmail(String userM) throws DataAccessException, SQLException{
        try {
            UserData userData = jdbcTemplate.queryForObject(FIND_USER_BY_EMAIL, rowMapper, userM);
            return Optional.ofNullable(userData);
        } catch (EmptyResultDataAccessException ex) {
            return Optional.empty();
        }
     }    


    public List<UserData>findAll() throws DataAccessException, SQLException{
        return jdbcTemplate.query(FIND_ALL_USERS, rowMapper);
    }

    // public List<UserData>findAll(){
    //     List<UserData> userList = new ArrayList<UserData>();
    //     userList= jdbcTemplate.query(FIND_ALL_USERS, new ResultSetExtractor<List<UserData>>(){
    //         @Override
    //         public List<UserData> extractData(@NonNull ResultSet rs) throws SQLException, DataAccessException {
    //             List<UserData> users = new ArrayList<UserData>();
    //             while (rs.next()){
    //                 UserData user = new UserData();
    //                 user.setId(rs.getInt("id"));
    //                 user.setFirst_name(rs.getString("first_name"));
    //                 user.setLast_name(rs.getString("last_name"));
    //                 user.setLastMod(rs.getTimestamp("lastMod").toLocalDateTime());
    //                 user.setDateCreated((rs.getTimestamp("dateCreated")).toLocalDateTime());
    //                 user.setDescript(rs.getString("descript"));
    //                 users.add(user);
    //             }
    //             return users;
    //         }
    //     });
    //     return userList;
    // }

}

