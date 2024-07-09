package nus.mini.backend.models;

import java.io.Serializable;

import com.google.gson.JsonArray;
import com.google.gson.JsonParser;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PemSetting implements Serializable{
    // INSERT INTO pem_settings (userId, keywordArray)
    // VALUES (1, '["keyword1", "keyword2", "keyword3"]');

    private static final long serialVersionUID = 1L;
    
    private int id;

    @NotBlank(message = "userId is mandatory")
    private int userId;

 //   @Column(columnDefinition ="json")
    private String keywordArray;

    public JsonArray getKeywordArrayAJsonArray(){
        return JsonParser.parseString(this.keywordArray).getAsJsonArray();
    }
    public String getKeywordArray(){
        return this.keywordArray;
    }

    public void setKeywordArray(String keywordArray) {
        this.keywordArray = keywordArray;
    }

    public void setKeywordJsonArray(JsonArray keywordArray) {
        this.keywordArray = keywordArray.toString();
    }

}
