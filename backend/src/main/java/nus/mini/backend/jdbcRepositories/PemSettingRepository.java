package nus.mini.backend.jdbcRepositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import jakarta.validation.Valid;
import nus.mini.backend.models.PemSetting;

@Repository
public class PemSettingRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final PemSettingRowMapper rowMapper = new PemSettingRowMapper();


    private final String INSERT_PEMSETTING="""
        INSERT INTO pem_settings (userId, keywordArray) VALUES (?, ?)
        """;
    private final String UPDATE_PEMSETTING = """
        UPDATE pem_settings SET userId=?, keywordArray=? WHERE id=?
        """;

    public List<PemSetting> findAll(){
        String sql= "SELECT * FROM pem_settings";
        return jdbcTemplate.query(sql, rowMapper);
    }

    public PemSetting findById(int id){
        String sql="SELECT * FROM pem_settings where id=?";
        return jdbcTemplate.queryForObject(sql, rowMapper, id);
    }

    //returns the id of the newly created pemSetting
    public int save(@Valid PemSetting pemSetting){
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(new PreparedStatementCreator() {
            @SuppressWarnings("null")
            @Override
            public PreparedStatement createPreparedStatement(@NonNull Connection con) throws SQLException {
                PreparedStatement pst = con.prepareStatement(INSERT_PEMSETTING, new String[]{"id"});
                // if (pst == null) {
                //     throw new SQLException("Failed to create a PreparedStatement");
                // } 
                pst.setInt(1, pemSetting.getUserId());
                pst.setString(2, pemSetting.getKeywordArray());
                return pst;                
            }
        }, keyHolder);
        Number key = keyHolder.getKey();
        if ( key ==null) return 0;
        return key.intValue();
    }

    public int update(@Valid PemSetting pemSetting){
        return jdbcTemplate.update(UPDATE_PEMSETTING, pemSetting.getUserId(),
            pemSetting.getKeywordArray(), pemSetting.getId());
    }

    public int deleteById(int id){
        String sql ="DELETE FROM pem_settings WHERE id=?";
        return jdbcTemplate.update(sql,id);
    }
}
