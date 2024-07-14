package nus.mini.backend.jdbcrepositories;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;

@Repository
public class S3Repo {

    @Autowired
    private AmazonS3 s3;
    
    @Value("${do.storage.bucket.name}")
    private String bucketName;

    public String saveToS3(MultipartFile uploadFile, String username) {

        String id = UUID.randomUUID().toString().substring(0, 8);
        
        try {
            Map<String, String> userData = new HashMap<>();
            userData.put("name", username);
            userData.put("uploadTime", new Date().toString());
            userData.put("filename", uploadFile.getOriginalFilename());

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(uploadFile.getContentType());
            metadata.setContentLength(uploadFile.getSize());
            metadata.setUserMetadata(userData);

            PutObjectRequest putRequest = new PutObjectRequest(this.bucketName, "%s".formatted(id), uploadFile.getInputStream(),
                    metadata);
            putRequest.withCannedAcl(CannedAccessControlList.PublicRead);

            PutObjectResult result = s3.putObject(putRequest);
            System.out.println("PutObjectResult: " + result.getMetadata().toString());

        } catch (IOException e) {
            e.printStackTrace();
        }

        return id;
    }

}
