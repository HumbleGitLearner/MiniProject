package nus.mini.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.result.UpdateResult;

import jakarta.validation.Valid;
import nus.mini.backend.models.MonthlyStatement;
import nus.mini.backend.services.StatementService;



@RestController
@RequestMapping("/api/monthly-statements")
public class StatementController {

    @Autowired
    private StatementService statementService;  

    @PostMapping("/add")    
    public ResponseEntity<MonthlyStatement> saveMonthlyStatement(@Valid @RequestBody 
                MonthlyStatement stmt) {
        //TODO: process POST request
        MonthlyStatement saved = statementService.saveMonthlyStatement(stmt);
        return ResponseEntity.ok(saved);    
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<MonthlyStatement> getMonthlyStatement(@PathVariable String id) {
        MonthlyStatement stmt = statementService.getStatementById(id);  
        return ResponseEntity.ok(stmt);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<MonthlyStatement>> getAllMonthlyStatement() {
        List<MonthlyStatement> stmts = statementService.getAllStatements();  
        return ResponseEntity.ok(stmts);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MonthlyStatement>> getMonthlyStatementByUser(@PathVariable Integer userId) {
        List<MonthlyStatement> stmts = statementService.getStatementsByUser(userId);  
        return ResponseEntity.ok(stmts);
    }   

    @PutMapping("/{id}")
    public ResponseEntity<String> updateMonthlyStatementString (@PathVariable String id, 
                    @Valid @RequestBody MonthlyStatement stmt) {
        //TODO: process PUT request
        UpdateResult result= statementService.updateMonthlyStatementById(id, stmt);
        if (result.getModifiedCount() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("No monthlystatement found with the given ID, %s".formatted(id));
        } else if (result.getModifiedCount() == 1){
            return ResponseEntity.ok("Updated");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("No changes were made to the MonthlyStatement");
        }
    }


    @DeleteMapping("/{id}") 
    public ResponseEntity<String> deleteMonthlyStatement(@PathVariable String id) {
        statementService.deleteStatement(id);
        return ResponseEntity.ok("Deleted");
    }       
}
