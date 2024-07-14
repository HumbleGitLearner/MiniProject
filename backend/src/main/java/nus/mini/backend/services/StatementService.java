package nus.mini.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mongodb.client.result.UpdateResult;

import nus.mini.backend.models.MonthlyStatement;
import nus.mini.backend.mongodbrepositories.MongoDBRepository;


@Service
public class StatementService {
    @Autowired
    private MongoDBRepository mongoRepo;

    public MonthlyStatement saveMonthlyStatement(MonthlyStatement stmt){
        return mongoRepo.save(stmt);
    }
 
    public UpdateResult updateMonthlyStatementById(String id, MonthlyStatement stmt){
        return mongoRepo.updateStatementById(id, stmt);
    }

    public List<MonthlyStatement> getStatementsByUser(Integer user){
        return mongoRepo.findStatementsByUser(user);
    }

    public MonthlyStatement getStatementById(String id){
        Optional<MonthlyStatement> result= mongoRepo.findById(id);
        if (result.isEmpty())
            return null;
        return result.get();    
    }

    public List<MonthlyStatement> getAllStatements(){
        return mongoRepo.findAll();
    }

    public void deleteStatement(String id){
        mongoRepo.deleteStatementById(id);
    }   
}
