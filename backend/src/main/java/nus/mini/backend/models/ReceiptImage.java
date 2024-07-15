package nus.mini.backend.models;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "receipt_imgs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReceiptImage implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    private ObjectId _id;

    @NotBlank(message="UserID is mandatory")
    private int userId;

    private String fileName;

    private String contentType;

    private byte[] data;
    
    private LocalDateTime createdDate;

    public ReceiptImage(int userId, String fileName, 
                String type, byte[] content, LocalDateTime createdDate) {
        this.userId = userId;
        this.fileName = fileName;
        this.contentType = type;
        this.data = content;
        this.createdDate = createdDate;
    }

   public static ReceiptImage toReceiptImage(org.bson.Document doc) {
        return ReceiptImage.builder()
                ._id(doc.getObjectId("_id"))
                .userId(doc.getInteger("user_id"))
                .fileName(doc.getString("file_name"))
                .contentType(doc.getString("content_type"))
                .data(doc.get("data", byte[].class))
                .createdDate(doc.get("created_date", LocalDateTime.class))  
                .build();
	}

	@Override
	public String toString() {
        return "ReceiptImage[_id=%s, userId=%d, fileName=%s, contentType=%s, createDate=%s, data=%s]"
                .formatted(_id, userId, fileName, 
                    contentType, createdDate.toString(), new String(data));
	}

  
}
