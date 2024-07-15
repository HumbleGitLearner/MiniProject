package nus.mini.backend.mongodbrepositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import nus.mini.backend.models.ReceiptImage;

public interface ReceiptImgRepo extends MongoRepository<ReceiptImage, ObjectId> {
    // Custom query methods (if needed) can be defined here
}
