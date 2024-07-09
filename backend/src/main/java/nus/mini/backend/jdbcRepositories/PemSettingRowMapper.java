package nus.mini.backend.jdbcRepositories;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;

import nus.mini.backend.models.PemSetting;

public class PemSettingRowMapper implements RowMapper<PemSetting>{

    @Override
    public PemSetting mapRow(@NonNull ResultSet rs, int rowNum ) throws SQLException{
        PemSetting pemSetting = new PemSetting();
        pemSetting.setId(rs.getInt("id"));
        pemSetting.setUserId(rs.getInt("userId"));
        pemSetting.setKeywordArray(rs.getString("keywordArray"));
        return pemSetting;
    }

}
