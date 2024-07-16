package nus.mini.backend.jdbcrepositories;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
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
import nus.mini.backend.models.EnumTypes;
import nus.mini.backend.models.EnumTypes.CatType;
import nus.mini.backend.models.EnumTypes.PltfmType;
import nus.mini.backend.models.Receipt;

// import org.springframework.data.jpa.repository.JpaRepository;
// import nus.miniproject.backend.models.Receipt;
// public interface ReceiptRepository extends JpaRepository<Receipt, Integer>{}

@Repository
public class ReceiptRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final ReceiptRowMapper rowMapper = new ReceiptRowMapper();

    private static final String FIND_ALL_RECEIPTS="SELECT * from receipts";
    private static final String FIND_RECEIPT_BY_ID="SELECT * from receipts where receipts.id =?";
    private static final String FIND_RECEIPTS_BY_USER="SELECT * from receipts where receipts.user_id =?";  
    private static final String FIND_LAST_RECEIPTS_BY_USER="SELECT * FROM receipts WHERE user_id = ? ORDER BY trx_time DESC LIMIT ?"; 
    private static final String FIND_RECEIPTS_BY_CONSUMER="SELECT * from receipts where user_id =? AND consumer =?";  
    private static final String FIND_RECEIPTS_BY_PAYER="SELECT * from receipts where user_id =? AND payer =?";  
    private static final String FIND_RECEIPTS_BY_CATEGORY="SELECT * from receipts where user_id =? AND category =?";  
    private static final String FIND_RECEIPTS_BY_PLATFORM="SELECT * from receipts where user_id =? AND platform =?";  
    private static final String FIND_RECEIPTS_BY_MERCHANT="SELECT * from receipts where user_id =? AND merchant =?";  
    
    private static final String FIND_RECEITS_BY_USER_BTWN_TIME="""
       SELECT * FROM receipts WHERE user_id = ? AND trx_time BETWEEN ? AND ?;
    """;  
    private static final String FIND_SUM_BY_USER_BTWN_TIME="""
        SELECT SUM(total) AS sum FROM receipts WHERE user_id = ? AND trx_time BETWEEN ? AND ?;
     """;  
 
   // private static final String FIND_RECEIPT_THE_WK="""
    //    SELECT * FROM receipts WHERE user_id = ? AND trx_time BETWEEN 
    //     TIMESTAMP(DATE_SUB(DATE(NOW()), INTERVAL DAYOFWEEK(NOW()) - 1 DAY), '00:00:00') AND NOW();
    // """;
    // private static final String FIND_RECEIPT_THE_MNTH="""
    //         SELECT * FROM receipts  WHERE user_id = ?
    //         AND trx_time BETWEEN TIMESTAMP(DATE_FORMAT(NOW(), '%Y-%m-01 00:00:00')) AND NOW();
    // """;
     private static final String INSERT_RECEIPT= """
           INSERT INTO receipts (user_id, file_url, upload_time, payer, trx_time,
            total, category, platform, merchant, consumer, payment_type) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """;
    private static final String UPDATE_RECEIPT ="""
           UPDATE receipts SET user_id=?, file_url=?, upload_time=?, payer=?, trx_time=?, total=?, 
            category=?, platform=?, merchant=?, consumer=?, payment_type=? WHERE id=?
     """;
    private static final String DELETE_RECEIPT= "delete from receipts where id=?";

    public int save(@Valid Receipt receipt)throws DataAccessException, SQLException{
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(new PreparedStatementCreator(){
            @SuppressWarnings("null")
            @Override
            public PreparedStatement createPreparedStatement(@NonNull Connection con) throws SQLException{
                PreparedStatement pst= con.prepareStatement(INSERT_RECEIPT, new String[]{"id"});
                if (pst == null) throw new SQLException("Failed to create a PreparedStatement");
                pst.setInt(1, receipt.getUserId());
                pst.setString(2, receipt.getFileUrl());
 //               pst.setTimestamp(3,Timestamp.valueOf(receipt.getUploadTime()));
                pst.setTimestamp(3,Timestamp.valueOf(LocalDateTime.now()));
                pst.setString(4, receipt.getPayer());
                pst.setTimestamp(5, Timestamp.valueOf(receipt.getTrxTime()));
                pst.setBigDecimal(6, receipt.getTotal());
                pst.setString(7, receipt.getCategory().toString());
                pst.setString(8, receipt.getPlatform().toString());
                pst.setString(9, receipt.getMerchant());
                pst.setString(10, receipt.getConsumer());   
                pst.setString(11, receipt.getPaymentType().toString()); 
                return pst;
            }
        }, keyHolder);
      //  System.out.println("KeyHolder from ReceiptRepository: "+keyHolder.getKey());
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

    public int update(Receipt receipt) throws  DataAccessException, SQLException{
        int iUpdated=0;
        PreparedStatementSetter pss = new PreparedStatementSetter(){
            @Override
            public void setValues(@NonNull PreparedStatement pst) throws SQLException{
                pst.setInt(1, receipt.getUserId());
                pst.setString(2, receipt.getFileUrl());
                pst.setTimestamp(3,Timestamp.valueOf(LocalDateTime.now()));
                pst.setString(4, receipt.getPayer());
                pst.setTimestamp(5, Timestamp.valueOf(receipt.getTrxTime()));
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

    public int delete(Integer id) throws DataAccessException, SQLException{
        int result=0;
        try{
            result= jdbcTemplate.update(DELETE_RECEIPT, id);
        } catch (EmptyResultDataAccessException ex){
            result=0 ;
        }
        return result;
    }

    public Optional<Receipt> findById(Integer id) throws DataAccessException, SQLException{
        try{
            Receipt receipt = jdbcTemplate.queryForObject(FIND_RECEIPT_BY_ID, rowMapper, id);
            return Optional.ofNullable(receipt);
        } catch (EmptyResultDataAccessException ex){
            return Optional.empty();
        }   
    }    

    public Optional<List<Receipt>> findByUserBTWTime(int user, Timestamp toTime
                    , Timestamp fromTime) throws DataAccessException, SQLException{
        try{
            List<Receipt> receipts = jdbcTemplate.query(
                FIND_RECEITS_BY_USER_BTWN_TIME, rowMapper, user, toTime, fromTime );
            return Optional.ofNullable(receipts);
        } catch (EmptyResultDataAccessException ex){
            return Optional.empty();
        }           
    }
    public BigDecimal findSumUserBTWTime(int userId, Timestamp fromTime
                    , Timestamp toTime ) throws DataAccessException, SQLException{
        try{
          if (fromTime !=null && toTime !=null){             
            BigDecimal result = jdbcTemplate.queryForObject(
                FIND_SUM_BY_USER_BTWN_TIME, BigDecimal.class,
                new Object[]{userId, fromTime, toTime});
            if (result !=null) { return result;
            } else { return new BigDecimal(0.0) ;}
        }
        } catch (EmptyResultDataAccessException ex){
            return new BigDecimal(0);
        }  
        return new BigDecimal(0);
    }   

    // public int findSumUserBTWTime(int userId, Timestamp fromTime
    //                 , Timestamp toTime) throws  DataAccessException, SQLException{
    //     int iUpdated=0;
    //     PreparedStatementSetter pss = new PreparedStatementSetter(){
    //         @Override
    //         public void setValues(@NonNull PreparedStatement pst) throws SQLException{
    //             pst.setInt(1, userId);
    //             pst.setTimestamp(2, fromTime);
    //             pst.setTimestamp(3,toTime);
    //            }
    //     };
    //     iUpdated=jdbcTemplate.queryForObject(FIND_SUM_BY_USER_BTWN_TIME, pss, Integer.class);
    //     return iUpdated;
    // }


    public List<Receipt> findByConsumer(int user, String consumer)  throws DataAccessException, SQLException{
         return jdbcTemplate.query(FIND_RECEIPTS_BY_CONSUMER, rowMapper, user, consumer);
    }
    
    public List<Receipt> findByPayer(int user, String payer) throws DataAccessException, SQLException{
        return jdbcTemplate.query(FIND_RECEIPTS_BY_PAYER, rowMapper, user, payer);
   }

   public List<Receipt> findByCategory(int user, String category) throws DataAccessException, SQLException{
        CatType cat= EnumTypes.getCategoryFromString(category);
        return jdbcTemplate.query(FIND_RECEIPTS_BY_CATEGORY, rowMapper, user, cat);
}

    public List<Receipt> findByPlatform(int user, String platform) throws DataAccessException, SQLException {
        PltfmType pltfm= EnumTypes.getPltfmTypeFromString(platform);
        return jdbcTemplate.query(FIND_RECEIPTS_BY_PLATFORM, rowMapper, user, pltfm);
    }

    public List<Receipt> findByMerchant(int user, String merchant) throws DataAccessException, SQLException {
        return jdbcTemplate.query(FIND_RECEIPTS_BY_MERCHANT, rowMapper, user, merchant);
    }

    public List<Receipt> findAllByUser(int user) throws DataAccessException, SQLException {
        return jdbcTemplate.query(FIND_RECEIPTS_BY_USER, rowMapper, user);
    }

    public List<Receipt> findLastReceiptsByUser(int user, int limit) throws DataAccessException, SQLException{
        return jdbcTemplate.query(FIND_LAST_RECEIPTS_BY_USER, rowMapper, user, limit);
    }

    public List<Receipt>findAll() throws DataAccessException, SQLException{
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

