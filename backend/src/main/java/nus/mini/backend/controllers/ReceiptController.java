package  nus.mini.backend.controllers;

import java.math.BigDecimal;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.validation.Valid;
import nus.mini.backend.models.ReceiptDTO;
import nus.mini.backend.services.ReceiptService;


@RestController
@RequestMapping("/api/expenses")
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
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReceiptDTO>> getAllByUser(@PathVariable int userId)
                           throws DataAccessException, SQLException {
        List<ReceiptDTO> receipts = receiptService.findAllByUser(userId);
        if (receipts.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(receipts);
        }
    }
    

    //"SELECT * FROM receipts ORDER BY trx_time DESC LIMIT 3;"
    @GetMapping("/user/{userId}/limit")
    public ResponseEntity<List<ReceiptDTO>> getLastReceiptsByUser(@PathVariable int userId,
                @RequestParam int limit) throws DataAccessException, SQLException {
        List<ReceiptDTO> receipts = receiptService.findLastReceiptsByUser(userId, limit);
        if (receipts.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(receipts);
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

    //For Reports
    @GetMapping("/summary/{userId}")
    public ResponseEntity<String> getSummaryByUser(@PathVariable int userId) 
                            throws DataAccessException, SQLException {
        BigDecimal sumLastMnth = receiptService.findSumMnthlastByUser(userId);
        BigDecimal sumThisYear = receiptService.findSumYearToDateByUser(userId);
        BigDecimal sum2Mnth = receiptService.findSum2MnthlastByUser(userId);
        BigDecimal sumM2D = receiptService.findSumMnth2DByUser(userId);
        BigDecimal sumWk2D = receiptService.findSumWk2DByUser(userId);
        JsonObject summaryJ = Json.createObjectBuilder()
            .add("yearToDate", sumThisYear)
            .add("mon1ago", sumLastMnth)
            .add("mon2ago", sum2Mnth)
            .add("monToDate", sumM2D)
            .add("weekToDate", sumWk2D)
            .build();
        return ResponseEntity.ok(summaryJ.toString());
     }

    @GetMapping("/wk2date/{userId}")
    public ResponseEntity<List<ReceiptDTO>> getWk2DateByUser(@PathVariable int userId) 
                            throws DataAccessException, SQLException {
        List<ReceiptDTO> receipts = receiptService.getWk2DateByUser(userId);
        if (receipts.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(receipts);
        }
    }

    @GetMapping("/mnth2date/{userId}")
    public ResponseEntity<List<ReceiptDTO>> getMnth2dateByUser(@PathVariable int userId) 
                            throws DataAccessException, SQLException {
        List<ReceiptDTO> receipts = receiptService.findReceiptsByUserAndMonth(userId);
        if (receipts.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(receipts);
        }
    }

    @GetMapping("/mnthlast/{userId}")
    public ResponseEntity<List<ReceiptDTO>> findMnthlastByUser(@PathVariable int userId) 
                            throws DataAccessException, SQLException {
        List<ReceiptDTO> receipts = receiptService.findMnthlastByUser(userId);
        if (receipts.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(receipts);
        }
    }


}
