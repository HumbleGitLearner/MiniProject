package nus.mini.backend.jdbcRepositories;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import nus.mini.backend.models.GPhotoSetting;

@Repository
public class GPhotoRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<GPhotoSetting> rowMapper = new RowMapper<>(){
        @Override
        public GPhotoSetting mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException{
            GPhotoSetting gPhotoSetting = new GPhotoSetting();
            gPhotoSetting.setId( rs.getInt("id"));
            gPhotoSetting.setUserId(rs.getInt("userId"));
            gPhotoSetting.setFilepath(rs.getString("filepath"));
            return gPhotoSetting;
        }
    };

    public List<GPhotoSetting> findAll() throws DataAccessException{
        return jdbcTemplate.query("SELECT * from gphoto", rowMapper);
    }

    public GPhotoSetting findById(int id) throws DataAccessException{
        return jdbcTemplate.queryForObject("SELECT * FROM gphotos WHERE id = ?"
                            , rowMapper  , id );
    }

    // public GPhotoSetting findById(int id) throws DataAccessException {
    //     return jdbcTemplate.queryForObject(
    //         "SELECT * FROM gphotos WHERE id = ?",
    //         (rs, rowNum) -> {
    //             GPhotoSetting setting = new GPhotoSetting();
    //             setting.setId(rs.getInt("id"));
    //             setting.setName(rs.getString("name"));
    //             // Set other properties as needed
    //             return setting;
    //         },
    //         id
    //     );
    // }
    
    public int update(GPhotoSetting gPhotoSetting){
        return jdbcTemplate.update("UPDATE gphotos SET userId=?, filepath=? WHERE id=?",
        gPhotoSetting.getUserId(), gPhotoSetting.getFilepath(), gPhotoSetting.getId());
    }

    public int save(GPhotoSetting gPhotoSetting){
        return jdbcTemplate.update("INSERT INTO gphotos (userId, filepath) VAULES (?, ?)",
            gPhotoSetting.getUserId(), gPhotoSetting.getFilepath());
    }

    public int deleteById(int id){
        return jdbcTemplate.update("DELETE FROM gphotos WHERE id=?", id);
    }
}
