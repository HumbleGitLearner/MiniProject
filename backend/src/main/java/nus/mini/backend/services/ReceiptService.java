package nus.mini.backend.services;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.DateTimeException;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import nus.mini.backend.jdbcrepositories.ReceiptRepository;
import nus.mini.backend.models.Receipt;
import nus.mini.backend.models.ReceiptDTO;

@Service
public class ReceiptService {

    @Autowired
    private ReceiptRepository receiptRepository;

    public static ReceiptDTO toDTO(Receipt receipt) {
        return new ReceiptDTO(
            receipt.getId(),
            receipt.getUserId(),
            receipt.getFileUrl(),
            receipt.getUploadTime(),
            receipt.getPayer(),
            receipt.getTrxTime(),
            receipt.getTotal(),
            receipt.getCategory(),
            receipt.getPlatform(),
            receipt.getMerchant(),
            receipt.getConsumer(),
            receipt.getPaymentType()
        );
    }

    public static Receipt toEntity(ReceiptDTO receiptDTO) {
        return new Receipt(
            receiptDTO.getId(),
            receiptDTO.getUserId(),
            receiptDTO.getFileUrl(),
            receiptDTO.getUploadTime(),
            receiptDTO.getPayer(),
            receiptDTO.getTrxTime(),
            receiptDTO.getTotal(),
            receiptDTO.getCategory(),
            receiptDTO.getPlatform(),
            receiptDTO.getMerchant(),
            receiptDTO.getConsumer(),
            receiptDTO.getPaymentType()
        );
    }


  
    public int save(ReceiptDTO upload) throws DataAccessException, SQLException {
        return receiptRepository.save(toEntity(upload));   
    }
 
    public List<ReceiptDTO> findAll() throws DataAccessException, SQLException{
        List<Receipt> receipts = receiptRepository.findAll();
        if (receipts.isEmpty()) {
            return List.of();
        }
        List<ReceiptDTO> receiptDTOs= receipts.stream()
                    .map(ReceiptService::toDTO).toList();
        return receiptDTOs;
    }

    public Optional<ReceiptDTO> findById(int id) throws DataAccessException, SQLException{
        Optional<Receipt> receipt = receiptRepository.findById(id);
        if (receipt.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(toDTO(receipt.get()));
        }
    }
    
    public Optional<Receipt> findEntityById(int id) throws DataAccessException, SQLException{
        Optional<Receipt> result = receiptRepository.findById(id);
         if (result.isEmpty())
            return Optional.empty();
        return Optional.of(result.get());
    }

    public List<ReceiptDTO> findAllByUser(int user) throws DataAccessException, SQLException{
        List<Receipt> receipts = receiptRepository.findAllByUser(user);
        if (receipts.isEmpty()) {
            return List.of();
        }
        List<ReceiptDTO> receiptDTOs= receipts.stream()
                    .map(ReceiptService::toDTO).toList();
        return receiptDTOs;
    }

    public List<ReceiptDTO> findLastReceiptsByUser(int user, int limit) 
                                    throws DataAccessException, SQLException{
        List<Receipt> receipts = receiptRepository.findLastReceiptsByUser(user, limit);
        if (receipts.isEmpty()) {
            return List.of();
        }
        List<ReceiptDTO> receiptDTOs= receipts.stream()
                    .map(ReceiptService::toDTO).toList();
        return receiptDTOs;
    }

    public int update(ReceiptDTO receipt) throws DataAccessException, SQLException{
        Optional<Receipt> result= findEntityById(receipt.getId());
        if (result.isEmpty())
            return 0;
         return receiptRepository.update(toEntity(receipt));
    }

    public int delete(int id) throws DataAccessException, SQLException{
        return receiptRepository.delete(id);
    }

    // For Reports
    public List<ReceiptDTO> findReceiptsByUserAndMonth(int userId)
            throws DataAccessException, SQLException {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfMonth = now.withDayOfMonth(1).toLocalDate().atStartOfDay();
        Optional<List<Receipt>> receipts = receiptRepository
                .findByUserBTWTime(userId, Timestamp.valueOf(startOfMonth), Timestamp.valueOf(now));
        if (receipts.isEmpty()) {
            return List.of();
        }
        List<ReceiptDTO> receiptDTOs = receipts.get().stream()
                .map(ReceiptService::toDTO).toList();
        return receiptDTOs;
    }

    public List<ReceiptDTO> getWk2DateByUser(int user) 
                        throws DataAccessException, SQLException {
        LocalDateTime now = LocalDateTime.now();
        // Find the previous or same Sunday
        LocalDateTime startOfWeek = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY))
                                       .toLocalDate()
                                       .atStartOfDay();
         Optional<List<Receipt>> receipts = receiptRepository
              .findByUserBTWTime(user, Timestamp.valueOf(startOfWeek), Timestamp.valueOf(now));
         if (receipts.isEmpty()) {
            return List.of();
        }
        List<ReceiptDTO> receiptDTOs = receipts.get().stream()
                .map(ReceiptService::toDTO).toList();
        return receiptDTOs;
    }
    
    public List<ReceiptDTO> findMnthlastByUser(int user) 
                        throws DataAccessException, SQLException, DateTimeException {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime sLastMonth = now.minusMonths(1)
                    .withDayOfMonth(1).toLocalDate().atStartOfDay();
        LocalDateTime eLastMonth = now.withDayOfMonth(1).toLocalDate().atStartOfDay();  
        Optional<List<Receipt>> receipts = receiptRepository
                .findByUserBTWTime(user, Timestamp.valueOf(sLastMonth), Timestamp.valueOf(eLastMonth));
        if (receipts.isEmpty()) {
            return List.of();
        }
        List<ReceiptDTO> receiptDTOs = receipts.get().stream()
                .map(ReceiptService::toDTO).toList();
        return receiptDTOs;
    }
    public BigDecimal findSumWk2DByUser(int user) 
            throws DataAccessException, SQLException, DateTimeException {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfWeek = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY))
                                       .toLocalDate()
                                       .atStartOfDay();
        BigDecimal sumLastMnth = receiptRepository.findSumUserBTWTime(
                    user, Timestamp.valueOf(startOfWeek), Timestamp.valueOf(now));
        return sumLastMnth;
    }


    public BigDecimal findSumMnth2DByUser(int user) 
            throws DataAccessException, SQLException, DateTimeException {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime sMonth = now.withDayOfMonth(1).toLocalDate().atStartOfDay();
        BigDecimal sumLastMnth = receiptRepository.findSumUserBTWTime(
                user, Timestamp.valueOf(sMonth), Timestamp.valueOf(now));
        return sumLastMnth;
    }

    public BigDecimal findSum2MnthlastByUser(int user) 
            throws DataAccessException, SQLException, DateTimeException {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime sLast2Month = now.minusMonths(2)
                .withDayOfMonth(1).toLocalDate().atStartOfDay();
        LocalDateTime eLast2Month = now.minusMonths(1).withDayOfMonth(1)
                        .toLocalDate().atStartOfDay().minusSeconds(1);
        BigDecimal sumLastMnth = receiptRepository.findSumUserBTWTime(
                user, Timestamp.valueOf(sLast2Month), Timestamp.valueOf(eLast2Month));
        return sumLastMnth;
    }

    public BigDecimal findSumMnthlastByUser(int user) 
                        throws DataAccessException, SQLException, DateTimeException {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime sLastMonth = now.minusMonths(1)
                            .withDayOfMonth(1).toLocalDate().atStartOfDay();
        LocalDateTime eLastMonth = now.withDayOfMonth(1).toLocalDate()
                                        .atStartOfDay().minusSeconds(1);  
        BigDecimal sumLastMnth = receiptRepository.findSumUserBTWTime(
                        user, Timestamp.valueOf(sLastMonth), Timestamp.valueOf(eLastMonth));
        return sumLastMnth;
    }

    public BigDecimal findSumYearToDateByUser(int user) 
                        throws DataAccessException, SQLException, DateTimeException {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime sYear = now.withDayOfYear(1).toLocalDate().atStartOfDay();
        BigDecimal sumYearToDate = receiptRepository.findSumUserBTWTime(
                        user, Timestamp.valueOf(sYear), Timestamp.valueOf(now));
        return sumYearToDate;
    }


    // public List<ReceiptDTO> findByDate(int user, String date) 
    //                                 throws DataAccessException, SQLException{
    //     List<Receipt> receipts = receiptRepository.findByDate(user, date);
    //     if (receipts.isEmpty()) {
    //         return List.of();
    //     }
    //     List<ReceiptDTO> receiptDTOs= receipts.stream()
    //                 .map(ReceiptService::toDTO).toList();
    //     return receiptDTOs;
    // }
    
    public List<ReceiptDTO> findByConsumer(int user, String consumer) 
                                    throws DataAccessException, SQLException{
        List<Receipt> receipts = receiptRepository.findByConsumer(user, consumer);
        if (receipts.isEmpty()) {
            return List.of();
        }
        List<ReceiptDTO> receiptDTOs= receipts.stream()
                    .map(ReceiptService::toDTO).toList();
        return receiptDTOs;
    }
    public List<ReceiptDTO> findByPayer(int user, String payer) 
                                    throws DataAccessException, SQLException{
        List<Receipt> receipts = receiptRepository.findByPayer(user, payer);
        if (receipts.isEmpty()) {
            return List.of();
        }
        List<ReceiptDTO> receiptDTOs= receipts.stream()
                    .map(ReceiptService::toDTO).toList();
        return receiptDTOs;
    }
    public List<ReceiptDTO> findByCategory(int user, String category) 
                                    throws DataAccessException, SQLException{
        List<Receipt> receipts = receiptRepository.findByCategory(user, category);
        if (receipts.isEmpty()) {
            return List.of();
        }
        List<ReceiptDTO> receiptDTOs= receipts.stream()
                    .map(ReceiptService::toDTO).toList();
        return receiptDTOs;
    }

    public List<ReceiptDTO> findByPlatform(int user, String platform) 
                                    throws DataAccessException, SQLException{
        List<Receipt> receipts = receiptRepository.findByPlatform(user, platform);
        if (receipts.isEmpty()) {
            return List.of();
        }
        List<ReceiptDTO> receiptDTOs= receipts.stream()
                    .map(ReceiptService::toDTO).toList();
        return receiptDTOs;
    }


    public List<ReceiptDTO> findByMerchant(int user, String merchant) 
                                    throws DataAccessException, SQLException{
        List<Receipt> receipts = receiptRepository.findByMerchant(user, merchant);
        if (receipts.isEmpty()) {
            return List.of();
        }
        List<ReceiptDTO> receiptDTOs= receipts.stream()
                    .map(ReceiptService::toDTO).toList();
        return receiptDTOs;
    }
 
}
