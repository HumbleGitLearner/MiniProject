package nus.mini.backend.models;

import java.io.Serializable;
import java.io.StringReader;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonReader;
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


    public JsonArray getKeyArrAsJArr(){
        try{
            JsonReader jReader = Json.createReader(new StringReader(this.keywordArray));
            return jReader.readArray();
        } catch (Exception e){
            return null;
        }
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
