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
import nus.mini.backend.models.Receipt;

// import org.springframework.data.jpa.repository.JpaRepository;
// import nus.miniproject.backend.models.Receipt;
// public interface ReceiptRepository extends JpaRepository<Receipt, Integer>{}

@Repository
public class ReceiptRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final ReceiptRowMapper rowMapper = new ReceiptRowMapper();

    final String FIND_ALL_RECEIPTS="SELECT * from receipts";
    final String FIND_RECEIPT_BY_ID="SELECT * from receipts where receipts.id =?";
    final String INSERT_RECEIPT= """
           INSERT INTO receipts (userId, fileUrl, uploadTime, payer, payTime,
            total, category, platform, merchant, consumer, paymentType) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """;
    final String UPDATE_RECEIPT ="""
           UPDATE receipts SET userId=?, fileUrl=?, uploadTime=?, payer=?, payTime=?, total=?, 
            category=?, platform=?, merchant=?, consumer=?, paymentType=? WHERE id=?
     """;
    final String DELETE_RECEIPT= "delete from receipts where id=?";

    public int save(@Valid Receipt receipt){
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(new PreparedStatementCreator(){
            @SuppressWarnings("null")
            @Override
            public PreparedStatement createPreparedStatement(@NonNull Connection con) throws SQLException{
                PreparedStatement pst= con.prepareStatement(INSERT_RECEIPT, new String[]{"id"});
                if (pst == null) throw new SQLException("Failed to create a PreparedStatement");
                pst.setInt(1, receipt.getUserId());
                pst.setString(2, receipt.getFileUrl());
                pst.setTimestamp(3,Timestamp.valueOf(receipt.getUploadTime()));
                pst.setString(4, receipt.getPayer());
                pst.setTimestamp(5, Timestamp.valueOf(receipt.getPayTime()));
                pst.setBigDecimal(6, receipt.getTotal());
                pst.setString(7, receipt.getCategory().toString());
                pst.setString(8, receipt.getPlatform().toString());
                pst.setString(9, receipt.getMerchant());
                pst.setString(10, receipt.getConsumer());   
                pst.setString(11, receipt.getPaymentType().toString()); 
                return pst;
            }
        }, keyHolder);
        Number key= keyHolder.getKey();
        if (key==null) return 0;
        return key.intValue();

        // PreparedStatementCallback<Boolean> psc= new PreparedStatementCallback<Boolean>(){
        //     @Override
        //        public Boolean doInPreparedStatement(@NonNull PreparedStatement ps) throws SQLException, DataAccessException{
        //         ps.setInt(1, receipt.getUserId());
 
        //         Boolean rslt=ps.execute();
        //         return rslt;
        //     }
        // };
        // bSaved= jdbcTemplate.execute(insertSQL, psc);
        // return bSaved;
    }

    public int update(Receipt receipt){
        int iUpdated=0;
        PreparedStatementSetter pss = new PreparedStatementSetter(){
            @Override
            public void setValues(@NonNull PreparedStatement pst) throws SQLException{
                pst.setInt(1, receipt.getUserId());
                pst.setString(2, receipt.getFileUrl());
                pst.setTimestamp(3,Timestamp.valueOf(receipt.getUploadTime()));
                pst.setString(4, receipt.getPayer());
                pst.setTimestamp(5, Timestamp.valueOf(receipt.getPayTime()));
                pst.setBigDecimal(6, receipt.getTotal());
                pst.setString(7, receipt.getCategory().toString());
                pst.setString(8, receipt.getPlatform().toString());
                pst.setString(9, receipt.getMerchant());
                pst.setString(10, receipt.getConsumer());   
                pst.setString(11, receipt.getPaymentType().toString()); 
                pst.setInt(12, receipt.getId());
             }
        };
        iUpdated=jdbcTemplate.update(UPDATE_RECEIPT, pss);
        return iUpdated;
    }

    public int delete(Integer id){
        return jdbcTemplate.update(DELETE_RECEIPT, id);
    }


    public Receipt findById(Integer id){
        return jdbcTemplate.queryForObject(FIND_RECEIPT_BY_ID, rowMapper, id);
    }

    public List<Receipt>findAll(){
        return jdbcTemplate.query(FIND_ALL_RECEIPTS, rowMapper);
    }
   
    // public int delete(Integer id){
    //     int bDeleted=0;
    //     PreparedStatementSetter pss= new PreparedStatementSetter(){
    //         @Override
    //         public void setValues(@NonNull PreparedStatement ps) throws SQLException{
    //             ps.setInt(1, id);
    //         }
    //     };
    //     bDeleted= jdbcTemplate.update(deleteSQL, pss);
    //     return bDeleted;
    // }

    // public List<Receipt>findAll(){
    //     List<Receipt> receiptList = new ArrayList<Receipt>();
    //     receiptList= jdbcTemplate.query(findAllSQL, new ResultSetExtractor<List<Receipt>>(){
    //         @Override
    //         public List<Receipt> extractData(@NonNull ResultSet rs) throws SQLException, DataAccessException {
    //             List<Receipt> receipts = new ArrayList<Receipt>();
    //             while (rs.next()){
    //                 Receipt receipt = new Receipt();
    //                 receipt.setId(rs.getInt("id"));
    //                 receipt.setUserId(rs.getInt("RECEIPTId"));
    //               receipts.add(receipt);
    //             }
    //             return receipts;
    //         }
    //     });
    //     return receiptList;
    // }

    // public Receipt findByReceiptId(Integer receiptId){
    //     // System.out.println("ReceiptRepository @findByReceiptId >>>"+ ReceiptId);
    //     // return jdbcTemplate.queryForObject(findByIdSQL, BeanPropertyRowMapper.newInstance(Receipt.class), ReceiptId);

    //     Receipt upld = new Receipt();
    //     upld = jdbcTemplate.query(findByIdSQL, new ResultSetExtractor<Receipt>(){
    //         @Override
    //         public Receipt extractData(@NonNull ResultSet rs) throws SQLException, DataAccessException{
    //             Receipt receipt = new Receipt();
    //             while (rs.next()){
    //                 receipt.setId(rs.getInt("id"));
    //                 receipt.setUserId(rs.getInt("RECEIPTId"));
    //              }
    //             return receipt;
    //         }
    //     }, receiptId);
    //     return upld;
    // }
}

