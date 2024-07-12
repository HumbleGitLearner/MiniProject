package nus.mini.backend.jdbcRepositories;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;

import nus.mini.backend.models.EnumTypes;
import nus.mini.backend.models.Receipt;

public class ReceiptRowMapper implements RowMapper<Receipt>{

    @Override
    public Receipt mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException{
        Receipt receipt = new Receipt();
        receipt.setId( rs.getInt("id"));
        receipt.setUserId(rs.getInt("user_id"));
        receipt.setFileUrl(rs.getString("file_url"));
        receipt.setUploadTime(rs.getTimestamp("upload_time").toLocalDateTime());
        receipt.setPayer(rs.getString("payer"));
        receipt.setTrxTime(rs.getTimestamp("trx_time").toLocalDateTime());
        receipt.setTotal(rs.getBigDecimal("total"));
        receipt.setCategory(EnumTypes.getCategoryFromString(rs.getString("category")));
        receipt.setPlatform(EnumTypes.getPltfmTypeFromString(rs.getString("platform")));
        receipt.setMerchant( rs.getString("merchant"));
        receipt.setConsumer(rs.getString("consumer"));
        receipt.setPaymentType(EnumTypes.getPmtTypeFromString(rs.getString("payment_type")));
        return receipt;
    }
}
