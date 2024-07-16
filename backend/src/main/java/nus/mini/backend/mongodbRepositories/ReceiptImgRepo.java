package nus.mini.backend.mongodbrepositories;


import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import nus.mini.backend.models.ReceiptImage;

@Repository
public interface ReceiptImgRepo extends MongoRepository<ReceiptImage, ObjectId> {
    // Custom query methods can be defined here if needed
}
