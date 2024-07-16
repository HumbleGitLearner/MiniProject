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
    private int user_id;

    private String file_name;

    private String content_type;

    private byte[] data;
    
    private LocalDateTime created_date;

    public ReceiptImage(int userId, String fileName, 
                String type, byte[] content, LocalDateTime createdDate) {
        this.user_id = userId;
        this.file_name = fileName;
        this.content_type = type;
        this.data = content;
        this.created_date = createdDate;
    }

   public static ReceiptImage toReceiptImage(org.bson.Document doc) {
        return ReceiptImage.builder()
                ._id(doc.getObjectId("_id"))
                .user_id(doc.getInteger("user_id"))
                .file_name(doc.getString("file_name"))
                .content_type(doc.getString("content_type"))
                .data(doc.get("data", byte[].class))
                .created_date(doc.get("created_date", LocalDateTime.class))  
                .build();
	}

	@Override
	public String toString() {
        return "ReceiptImage[_id=%s, userId=%d, fileName=%s, contentType=%s, createDate=%s, data=%s]"
                .formatted(_id, user_id, file_name, 
                        content_type, created_date.toString(), new String(data));
	}

  
}
