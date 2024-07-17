package nus.mini.backend.services;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mongodb.client.result.UpdateResult;

import nus.mini.backend.models.MonthlyStatement;
import nus.mini.backend.models.ReceiptImage;
import nus.mini.backend.mongodbrepositories.MongoDBRepository;
import nus.mini.backend.mongodbrepositories.ReceiptImgRepo;

//serving MongoDB-realted services
@Service
public class DocumentService {
     
    @Autowired
    private MongoDBRepository mongoRepo;


    @Autowired
    private ReceiptImgRepo receiptImgRepo;

    //upload the file to MongoDB and create a ReceiptImage document
    public String saveReceiptImg(int userId, String fileName, 
                String contentType, byte[] content) {
        try{ 
            ObjectId imgId= mongoRepo.saveReceiptImgTemp(fileName, contentType, content);
            System.out.println("DocumentService >>> imgId: "+imgId);
            ReceiptImage rpImg= ReceiptImage.builder()
                            ._id(imgId)
                            .user_id(userId)
                            .file_name(fileName)
                            .content_type(contentType)
                            .data(content)
                            .created_date(LocalDateTime.now())
                            .build();
            receiptImgRepo.save(rpImg);  
            return imgId.toHexString();
        }catch(IOException e){
            return null;
        }
    }

    public byte[] downloadReceipt(String fileName) throws IOException {
      //  System.out.println("DocService: downloadReceipt: "+fileName);
        return mongoRepo.downloadReceipt(fileName);
    }

    public String getContentType(String fileName) throws IOException {
      //  System.out.println("DocService: getContentType: "+fileName);
        return mongoRepo.getContentType(fileName);
    }

 
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

// Using Google Cloud Document AI API    
//     import com.google.cloud.documentai.v1.Document;
// import com.google.cloud.documentai.v1.DocumentProcessorServiceClient;
// import com.google.cloud.documentai.v1.ProcessRequest;
// import com.google.cloud.documentai.v1.ProcessResponse;
// import com.google.cloud.documentai.v1.ProcessorName;
//     private static final String PROJECT_ID = "your_project_id";
//     private static final String LOCATION = "your_location"; // e.g., "us"
//     private static final String PROCESSOR_ID = "your_processor_id";

//     public com.google.cloud.documentai.v1.Document processDocument(byte[] fileContent) throws IOException {
//         try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create()) {
//             ProcessorName processorName = ProcessorName.of(PROJECT_ID, LOCATION, PROCESSOR_ID);

//             ProcessRequest request = ProcessRequest.newBuilder()
//                 .setName(processorName.toString())
//                 .setRawDocument(Document.RawDocument.newBuilder().setContent(com.google.protobuf.ByteString.copyFrom(fileContent)).setMimeType("application/pdf").build())
//                 .build();

//             ProcessResponse result = client.processDocument(request);
//             return result.getDocument();
//         }
//     }

}
