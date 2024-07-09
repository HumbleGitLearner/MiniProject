package nus.mini.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.JsonArray;
import com.google.gson.JsonParser;

import nus.mini.backend.jdbcRepositories.PemSettingRepository;
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
            JsonArray jsonArray = JsonParser.parseString(pemSetting.getKeywordArray()).getAsJsonArray();

            jsonArray.add(newKeyword);
            pemSetting.setKeywordArray(jsonArray.toString());
            result= pemSettingRepository.update(pemSetting);
        }
        return result;
    }

}
