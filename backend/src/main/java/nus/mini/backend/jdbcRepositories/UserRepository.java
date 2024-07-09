package nus.mini.backend.jdbcRepositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import jakarta.validation.Valid;
import nus.mini.backend.models.User;

// import org.springframework.data.jpa.repository.JpaRepository;
// import nus.miniproject.backend.models.User;
// public interface UserRepository extends JpaRepository<User, Integer>{}

@Repository
public class UserRepository{
    
    @Autowired
    JdbcTemplate jdbcTemplate;

    final String FIND_ALL_USERS="SELECT * from users";
    final String FIND_USER_BY_ID="SELECT * from users where user.id =?";
    final String INSERT_USER= """
        INSERT INTO users (email, password, token, secret, first_name, last_name,
         lastMod, dateCreated, loginType, descript, mobile, notif_telegram
         ,notif_email, scan_email, exp) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    """;
    final String UPDATE_USER ="""
        UPDATE users SET email=?, password=?, token=?, secret=?, first_name=?, 
        last_name=?, lastMod=?, dateCreated=?, loginType=?, descript=?
        , mobile=?, notif_telegram=?, notif_email=?, scan_email=?, exp=? where id=?
    """;
    final String DELETE_USER= "delete from users where id=?";

    private final UserRowMapper rowMapper = new UserRowMapper();

    // public Boolean save(User user){
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

    public int save(@Valid User user){
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
                pst.setString(5, user.getFirst_name());
                pst.setString(6, user.getLast_name());
                pst.setTimestamp(7, Timestamp.valueOf(user.getLastMod()));
                pst.setTimestamp(8, Timestamp.valueOf(user.getDateCreated()));
                pst.setObject(9, user.getLoginType().name());
                pst.setString(10, user.getDescript());
                 return pst;
            }
        }, keyHolder);
        Number key = keyHolder.getKey();
        if (key == null) return 0;
        return key.intValue();
    }

    public int update(User user){
        int iUpdated=0;
        PreparedStatementSetter pss = new PreparedStatementSetter(){
            @Override
            public void setValues(@NonNull PreparedStatement pst) throws SQLException{
                pst.setString(1, user.getEmail());
                pst.setString(2, user.getPassword());
                pst.setString(3, user.getToken());
                pst.setString(4, user.getSecret());
                pst.setString(5, user.getFirst_name());
                pst.setString(6, user.getLast_name());
                pst.setTimestamp(7, Timestamp.valueOf(user.getLastMod()));
                pst.setTimestamp(8, Timestamp.valueOf(user.getDateCreated()));
                pst.setObject(9, user.getLoginType().name());
                pst.setString(10, user.getDescript());
                 pst.setInt(11, user.getId());
           }
        };
        iUpdated=jdbcTemplate.update(UPDATE_USER, pss);
        return iUpdated;
    }

    public int delete(Integer id){
        return jdbcTemplate.update(DELETE_USER, id);
    }

    public User findById(Integer userId){
        // System.out.println("UserRepository @findByUserId >>>"+ userId);
        // return jdbcTemplate.queryForObject(findByIdSQL, BeanPropertyRowMapper.newInstance(User.class), userId);
        return jdbcTemplate.queryForObject(FIND_USER_BY_ID, rowMapper, userId);        
    }

    public List<User>findAll(){
        return jdbcTemplate.query(FIND_ALL_USERS, rowMapper);
    }

    // public List<User>findAll(){
    //     List<User> userList = new ArrayList<User>();
    //     userList= jdbcTemplate.query(FIND_ALL_USERS, new ResultSetExtractor<List<User>>(){
    //         @Override
    //         public List<User> extractData(@NonNull ResultSet rs) throws SQLException, DataAccessException {
    //             List<User> users = new ArrayList<User>();
    //             while (rs.next()){
    //                 User user = new User();
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

