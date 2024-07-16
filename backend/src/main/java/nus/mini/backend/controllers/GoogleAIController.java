package nus.mini.backend.controllers;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.documentai.v1.Document;

import nus.mini.backend.services.GoogleAIService;

@RestController
@RequestMapping("/api/documents")
public class GoogleAIController {

    @Autowired
    private GoogleAIService documentAIService;

    // @Autowired
    // private JdbcTemplate jdbcTemplate;

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
           // String filePath = "C:\\Users\\harri\\NUS-ISS Workshops\\mini\\test-images\\fc53b262.jpg"
        try {
            byte[] fileContent = file.getBytes();
            Document document = documentAIService.processDocument(fileContent);
            Map<String, String> extractedData = extractDataFromDocument(document);

            // Save extracted data to the database
          //  saveDataToDatabase(extractedData);
            System.out.println("Extracted data >>>>>>>: " + extractedData.toString());
            return "File processed successfully!";
        } catch (IOException e) {
            return "File processing failed: " + e.getMessage();
        }
    }

    private Map<String, String> extractDataFromDocument(Document document) {
        // Implement your data extraction logic here
        // For example, extract fields like total amount, date, vendor name, etc.
        System.out.println("Extracting data from the document...");
        System.out.println("Document >>>>>>>:  " + document.toString());
        return Map.of("totalAmount", "100.00", "date", "2023-07-10", "vendor", "Example Vendor");
    }

    // private void saveDataToDatabase(Map<String, String> data) {
    //     String sql = "INSERT INTO expenses (total_amount, date, vendor) VALUES (?, ?, ?)";
    //     jdbcTemplate.update(sql, data.get("totalAmount"), data.get("date"), data.get("vendor"));
    // }
}
