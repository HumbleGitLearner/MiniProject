package  nus.mini.backend.controllers;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
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
import org.springframework.web.multipart.MultipartFile;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.validation.Valid;
import nus.mini.backend.models.EnumTypes;
import nus.mini.backend.models.ReceiptDTO;
import nus.mini.backend.services.DocumentService;
import nus.mini.backend.services.ReceiptService;


@RestController
@RequestMapping("/api/expenses")
@Validated
public class ReceiptController {

    @Autowired
    private ReceiptService receiptService;
        
    @Autowired
    private DocumentService docService;


    //ToDo
    // @GetMapping("/download/{id}") //download receipt image files
    // public ResponseEntity<byte[]> downloadReceipt(@PathVariable int id) {
    // }

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

    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadReceiptImg(@RequestParam("fileUrl") String fileUrl)
             throws DataAccessException, SQLException, IOException {
      //  System.out.println("downloadReceiptImg >>> fileUrl: "+fileUrl);
        byte[] content = docService.downloadReceipt(fileUrl);
        if (content == null) {
            return ResponseEntity.notFound().build();
        }
        String contentType = docService.getContentType(fileUrl);
      //  System.out.println("downloadReceiptImg >>> content: "+contentType);
        if ((contentType == null)|| !MediaType.parseMediaType(contentType).isConcrete()) {
            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }
    
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(contentType));
        headers.setContentDispositionFormData("attachment", fileUrl);
    
        return ResponseEntity.ok()
                .headers(headers)
                .body(content);    
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

    //returning the id of the receipt newly created from the uploaded image
    @PostMapping("/upload/{userId}")
    public ResponseEntity<Integer> uploadReceiptImg(
                @RequestParam("file") MultipartFile file , @PathVariable int userId) 
                throws DataAccessException, SQLException, IOException {
        try{
            //upload the file to MongoDB and create a ReceiptImage document
            String filename= file.getOriginalFilename();
            String contentType = file.getContentType();
            byte[] content = file.getBytes();
            String docIdHex = docService.saveReceiptImg(userId, filename, contentType, content);
             if (docIdHex == null) {
                return ResponseEntity.internalServerError().build();
            }           
            //calling Document AI API to extract text from the image
            //create a new Receipt record in MySql
           // System.out.println("UploadReceiptImg >>> docIdHex: "+docIdHex);
            ReceiptDTO receipt = ReceiptDTO.builder( )
                            .userId(userId)
                            .fileUrl(filename)
                            .uploadTime(LocalDateTime.now())
                            .total(new BigDecimal(0.0))
                            .trxTime(LocalDateTime.now())
                            .category(EnumTypes.CatType.OTHER)
                            .platform(EnumTypes.PltfmType.OTHER)
                            .paymentType(EnumTypes.PmtsType.OTHER)
                            .build();
          //  System.out.println("UploadReceiptImg >>> receipt: "+receipt.toString());
            int id = receiptService.save(receipt);
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
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
