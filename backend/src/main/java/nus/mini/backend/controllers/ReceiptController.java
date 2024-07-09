package  nus.mini.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import nus.mini.backend.models.Receipt;
import nus.mini.backend.services.ReceiptService;


@RestController
@RequestMapping("/api/receipts")
@Validated
public class ReceiptController {

    @Autowired
    private ReceiptService receiptService;

    @GetMapping("/all")
    public ResponseEntity<List<Receipt>> getAllReceipts() {
        List<Receipt> receipts = receiptService.findAll();
        if (receipts.isEmpty()) {
            return ResponseEntity.noContent().build();
         } else {
            return ResponseEntity.ok(receipts);
       }   
    }

    @GetMapping("/{id}")
    public ResponseEntity<Receipt> getReceiptById(@PathVariable int id) {
        Receipt receipt = receiptService.findById(id);
        if (receipt != null) {
            return ResponseEntity.ok(receipt);
        } else {
            return ResponseEntity.notFound().build();   
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Receipt> createReceipt(@Valid @RequestBody Receipt receipt) {
        int id = receiptService.save(receipt);
        if (id == 0) {
            return ResponseEntity.badRequest().build();
        }
        receipt.setId(id);
        return ResponseEntity.ok(receipt);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Receipt> updateReceipt(@PathVariable int id, @Valid @RequestBody Receipt receipt) {
        receipt.setId(id);
        receiptService.update(receipt);
        return ResponseEntity.ok(receipt);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReceiptById(@PathVariable int id) {
        receiptService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
