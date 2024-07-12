package  nus.mini.backend.controllers;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import nus.mini.backend.models.ReceiptDTO;
import nus.mini.backend.services.ReceiptService;


@RestController
@RequestMapping("/api/receipts")
@Validated
public class ReceiptController {

    @Autowired
    private ReceiptService receiptService;

    @GetMapping("/all")
    public ResponseEntity<List<ReceiptDTO>> getAllReceipts() 
                         throws DataAccessException, SQLException {
        List<ReceiptDTO> receipts = receiptService.findAll();
        if (receipts.isEmpty()) {
            return ResponseEntity.noContent().build();
         } else {
            return ResponseEntity.ok(receipts);
       }   
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReceiptDTO> getReceiptById(@PathVariable int id)
                            throws DataAccessException, SQLException {
        Optional<ReceiptDTO> receipt = receiptService.findById(id);
        if (receipt.isEmpty()) {    
            return ResponseEntity.notFound().build();           
        } else {
            return ResponseEntity.ok(receipt.get()) ;    
        }
    }

    @PostMapping("/add")
    public ResponseEntity<ReceiptDTO> createReceipt(@Valid @RequestBody ReceiptDTO receipt) 
                                        throws DataAccessException, SQLException {
        int id = receiptService.save(receipt);
        if (id == 0) {
        //    return ResponseEntity.badRequest().build();
            return ResponseEntity.internalServerError().build();
        }
        receipt.setId(id);
        return ResponseEntity.ok(receipt);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReceiptDTO> updateReceipt(@PathVariable int id, 
                @Valid @RequestBody ReceiptDTO receipt) throws DataAccessException, SQLException  {
        receipt.setId(id);
        int update = receiptService.update(receipt);
        if (update == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(receipt);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReceiptById(@PathVariable int id)
                    throws DataAccessException, SQLException {
        int result = receiptService.delete(id);
        if (result == 0) {
            return ResponseEntity.notFound().build();
        }   
        return ResponseEntity.noContent().build();
    }

}
