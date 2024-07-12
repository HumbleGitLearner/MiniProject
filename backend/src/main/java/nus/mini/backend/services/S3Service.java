package nus.mini.backend.services;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import nus.mini.backend.jdbcRepositories.S3Repo;
import nus.mini.backend.models.UserData;

@Service
public class S3Service {
    
    @Autowired
    private S3Repo s3Repo;

    public String upload(MultipartFile file, UserData user) throws IOException{
  
        return s3Repo.saveToS3(file, String.valueOf(user.getId()));
    }

    // @Autowired
    // private AmazonS3 s3Client;

    // public String upload(MultipartFile file) throws IOException{
    //     // UserData data
    //     Map<String, String> userData = new HashMap<>();
    //     userData.put("name", "kenneth");
    //     userData.put("uploadTime", new Date().toString());
    //     userData.put("originalFilename", file.getOriginalFilename());
        
    //     // Metadata
    //     ObjectMetadata metadata = new ObjectMetadata();
    //     metadata.setContentType(file.getContentType());
    //     metadata.setContentLength(file.getSize());
    //     metadata.setUserMetadata(userData);
    //     String key = UUID.randomUUID().toString()
    //         .substring(0, 8);
    //     StringTokenizer tk = new StringTokenizer(file.getOriginalFilename(), ".");
    //     int count = 0;
    //     String filenameExt = "";
    //     // finds the second token in file.getOriginalFilename()
    //     while(tk.hasMoreTokens()){
    //         String token = tk.nextToken();
    //         if (count == 1) {
    //             filenameExt = token;
    //             break;
    //         }
    //         count++;
    //     }
    //     System.out.println("myobjects/%s.%s".formatted(key, filenameExt));
    //     if(filenameExt.equals("blob"))
    //         filenameExt = filenameExt + ".png";
    //     PutObjectRequest putRequest = 
    //         new PutObjectRequest(
    //             this.bucketName, 
    //             "myobjects/%s.%s".formatted(key, filenameExt), 
    //             file.getInputStream(), 
    //             metadata);
    //     putRequest.withCannedAcl(
    //             CannedAccessControlList.PublicRead);
    //     s3Client.putObject(putRequest);
    //     return "myobjects/%s.%s".formatted(key, filenameExt);
    // }
}
