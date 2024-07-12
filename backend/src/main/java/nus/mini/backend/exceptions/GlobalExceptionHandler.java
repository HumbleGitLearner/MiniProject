package nus.mini.backend.exceptions;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

  
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
        logger.error("User not found: " + ex.getMessage(), ex);
        return new ResponseEntity<>("User not found: " + ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // @ExceptionHandler(EmptyResultDataAccessException.class) not a runtime error
    // public ResponseEntity<String> handleEmptyResultException(EmptyResultDataAccessException ex) {
    //     logger.error("User not found: " + ex.getMessage(), ex);
    //     return new ResponseEntity<>("User not found: " + ex.getMessage(), HttpStatus.NOT_FOUND);
    // }


    @ExceptionHandler(SQLException.class)
    public ResponseEntity<String> handleSQLException(SQLException ex){
        logger.error("SQL error:"+ex.getMessage(), ex);
        return new ResponseEntity<>("SQL error:"+ex.getMessage(), 
            HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<String>handleDataAccessException(DataAccessException ex){
        logger.error("Data Access Error:"+ex.getMessage(), ex);
        return new ResponseEntity<>("Data Access Error:"+ex.getMessage(),
            HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex){
        logger.error("Illegal Argument:"+ex.getMessage(), ex);
        return new ResponseEntity<>("Input MonthlyStatement is null:"+ex.getMessage(), 
            HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(OptimisticLockingFailureException.class)
    public ResponseEntity<String>handleLockingException(OptimisticLockingFailureException ex){
        logger.error("MongoDB Locking Failure:"+ex.getMessage(), ex);
        return new ResponseEntity<>("MongoDB Locking Failure:"+ex.getMessage(),
            HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
