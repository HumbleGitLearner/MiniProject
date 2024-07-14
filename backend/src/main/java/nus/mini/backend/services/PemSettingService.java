package nus.mini.backend.services;

import java.io.StringReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonReader;
import nus.mini.backend.jdbcrepositories.PemSettingRepository;
import nus.mini.backend.models.PemSetting;

@Service
public class PemSettingService {
    @Autowired
    private PemSettingRepository pemSettingRepository;

    public List<PemSetting> findAll(){
        return pemSettingRepository.findAll();
    }

    public PemSetting findById(int id){
        return pemSettingRepository.findById(id);
    }

    public int save(PemSetting pemSetting){
        return pemSettingRepository.save(pemSetting);
    }
    
    public int update(PemSetting pemSetting){
        return pemSettingRepository.update(pemSetting);
    }

    public int deleteById(int id){
        return pemSettingRepository.deleteById(id);
    }

    public int addKeyword(int id, String newKeyword){
        int result = 0;
        PemSetting pemSetting = pemSettingRepository.findById(id);
        if (pemSetting !=null){
            try{
                JsonReader jReader = Json.createReader(new StringReader(pemSetting.getKeywordArray()));
                JsonArrayBuilder jArrBuilder = Json.createArrayBuilder(jReader.readArray());
                JsonArray kJArray= jArrBuilder.add(newKeyword).build();
                pemSetting.setKeywordArray(kJArray.toString());    
                result= pemSettingRepository.update(pemSetting);
            } catch (Exception e){
                return 0;
            }
        }
        return result;
    }

    public JsonArray getKeyArrAsJArr(int id){
        PemSetting pemSetting = pemSettingRepository.findById(id);
        if (pemSetting !=null){ 
            try{
                JsonReader jReader = Json.createReader(new StringReader(pemSetting.getKeywordArray()));
                return jReader.readArray();
            } catch (Exception e){
                return null;
            }
        } 
        return null;
    }  


}
