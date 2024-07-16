package nus.mini.backend.services;

import java.io.IOException;

import org.springframework.stereotype.Service;

import com.google.cloud.documentai.v1.Document;
import com.google.cloud.documentai.v1.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1.ProcessRequest;
import com.google.cloud.documentai.v1.ProcessResponse;
import com.google.cloud.documentai.v1.ProcessorName;
import com.google.cloud. documentai.v1.RawDocument;

@Service
public class GoogleAIService {

    private static final String PROJECT_ID = "neat-shell-428904-j4";
    private static final String LOCATION = "us"; // e.g., "us"
    private static final String PROCESSOR_ID = "f0907bec67c693f3";


    public Document processDocument(byte[] fileContent) throws IOException {
        try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create()) {
            // https://eu-documentai.googleapis.com/v1/projects/$PROJECT_ID/locations/eu/processors/$PROCESSOR_ID:process
            ProcessorName processorName = ProcessorName.of(PROJECT_ID, LOCATION, PROCESSOR_ID);

           ProcessRequest request = ProcessRequest.newBuilder()
                .setName(processorName.toString())
                .setRawDocument(RawDocument.newBuilder()
                    .setContent(com.google.protobuf.ByteString.copyFrom(fileContent))
                    .setMimeType("application/pdf")
                    .build())
                .build();
              
            
            ProcessResponse result = client.processDocument(request);
            return result.getDocument();
        }
    }
}
 