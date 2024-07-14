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

@Document(collection="monthly_statements")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MonthlyStatement implements Serializable  {
    //to ensure proper versioning during serialization
    private static final long serialVersionUID = 1L;

    @Id
    private ObjectId _id;

    @NotBlank(message="UserID is mandatory")
    private int userId;

    @NotBlank(message="fileName is mandatory")
    private String fileName;

    @NotBlank(message = "createdDate is mandatory")
    LocalDateTime createdDate;

    private byte[] content;

    public MonthlyStatement(int userId, String fileName, LocalDateTime createdDate, byte[] content) {
        this.userId = userId;
        this.fileName = fileName;
        this.createdDate = createdDate;
        this.content = content;
    }


    public static MonthlyStatement toStatement(org.bson.Document doc) {
		MonthlyStatement stmnt = new MonthlyStatement();
		stmnt.set_id(doc.getObjectId("_id")); //.toHexString() if storing id as string
		stmnt.setUserId(doc.getInteger("userId"));
		stmnt.setFileName(doc.getString("fileName"));
		stmnt.setCreatedDate(doc.get("createdDate", LocalDateTime.class));
        stmnt.setContent(doc.get("content", byte[].class));
		return stmnt;
	}

	@Override
	public String toString() {
        return "MonthlyStatement[_id=%s, userId=%d, fileName=%s, createdDate=%s, content=%s]"
                .formatted(_id, userId, fileName, createdDate.toString(), new String(content));
	}

}
