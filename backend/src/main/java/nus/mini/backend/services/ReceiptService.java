package nus.mini.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import nus.mini.backend.jdbcRepositories.ReceiptRepository;
import nus.mini.backend.models.Receipt;

@Service
public class ReceiptService {

    @Autowired
    private ReceiptRepository receiptRepository;
  
    public int save(Receipt upload) {
        return receiptRepository.save(upload);   
    }
 
    public List<Receipt> findAll(){
        return receiptRepository.findAll();
    }

    public Receipt findById(int id){
        return receiptRepository.findById(id);
    }
    
    public int update(Receipt upload){
        return receiptRepository.update(upload);
    }

    public int delete(int id){
        return receiptRepository.delete(id);
    }

 
}
