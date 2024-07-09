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
        receipt.setUserId(rs.getInt("userId"));
        receipt.setFileUrl(rs.getString("fileUrl"));
        receipt.setUploadTime(rs.getTimestamp("uploadTime").toLocalDateTime());
        receipt.setPayer(rs.getString("payer"));
        receipt.setPayTime(rs.getTimestamp("payTime").toLocalDateTime());
        receipt.setTotal(rs.getBigDecimal("total"));
        receipt.setCategory(EnumTypes.getCategoryFromString(rs.getString("category")));
        receipt.setPlatform(EnumTypes.getPltfmTypeFromString(rs.getString("platform")));
        receipt.setMerchant( rs.getString("merchant"));
        receipt.setConsumer(rs.getString("consumer"));
        receipt.setPaymentType(EnumTypes.getPmtTypeFromString(rs.getString("paymentType")));
        return receipt;
    }
}

