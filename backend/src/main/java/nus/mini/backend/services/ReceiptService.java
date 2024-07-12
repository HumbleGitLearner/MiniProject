package nus.mini.backend.services;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import nus.mini.backend.jdbcRepositories.ReceiptRepository;
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

    public int update(ReceiptDTO receipt) throws DataAccessException, SQLException{
        Optional<Receipt> result= findEntityById(receipt.getId());
        if (result.isEmpty())
            return 0;
         return receiptRepository.update(toEntity(receipt));
    }

    public int delete(int id) throws DataAccessException, SQLException{
        return receiptRepository.delete(id);
    }

 
}
