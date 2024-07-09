package nus.mini.backend.mongodbRepositories;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.mongodb.client.result.UpdateResult;

import nus.mini.backend.models.MonthlyStatement;

// public interface MonthlyStatementRepository extends MongoRepository<MonthlyStatement, String>


@Repository
public class MongoDBRepository {
    @Autowired
    private MongoTemplate template;

    public MonthlyStatement save(MonthlyStatement statement) {
        return template.save(statement);
    }

    public List<MonthlyStatement> findAll() {
        return template.findAll(MonthlyStatement.class);
    }

   /* ToDO: test the following methods
	 * db.monthly_statements.find({ userId: 'user'})
     *  .projection({ userId: 1, month: 1 , year: 1, createdDate : 1})
     *  .sort({ _id: 1 })
	 */
	public List<MonthlyStatement> findStatementsByUser(String user) {
		Criteria criteria = Criteria.where("userId").is(user);
		Query query = Query.query(criteria);
		query.fields().include("userId", "fileName", "createdDate", "content");
 		return template.find(query, Document.class, "monthly_statements").stream()
			.map(doc -> new MonthlyStatement( doc.getObjectId("_id"), doc.getString("usereId")
                        , doc.getString("fileName")
                        //, doc.get("createdDate". LocalDateTime.class)
                        , LocalDateTime.ofInstant(doc.getDate("createdDate").toInstant(), ZoneId.systemDefault())
                        , doc.get("content", byte[].class) )
                ).toList();
        //converting LocalDateTime to Date
        //Date.from(source.atZone(ZoneId.systemDefault()).toInstant())
	}


	/*
	 * db.monthly_statements.findOne({ _id: ObjectId('id') })
	 */
    public Optional<MonthlyStatement> findById(String id) {
        Criteria criteria = Criteria.where("_id").is(new ObjectId(id));
        Query query = new Query(criteria);
        MonthlyStatement result = template.findOne(query, MonthlyStatement.class);
        if (null == result)
            return Optional.empty();
        return Optional.of(result);

    }

    public void deleteStatementById(String id) {
        Criteria criteria = Criteria.where("_id").is(new ObjectId(id));
        Query query = new Query(criteria);
        template.remove(query, MonthlyStatement.class);
    }   

    // Update updateOps = new Update()
    // .set("name", personRecord.getName())
    // .set("age", personRecord.getAge())
    // //appends hobbies with the new list of hobbies
    // .push("hobbies").each(personRecord.getHobbies());
    // Remove item by value
    // update.pull("targetField", "value");
    // Remove multiple items
    // update.pullAll("targetField", new Object[]{"value1", "value2"});

    public UpdateResult updateStatementById(String id, MonthlyStatement statement) {
        // day 27 - slide 13
		Criteria criteria = Criteria.where("_id").is(new ObjectId(id));
		Query query = Query.query(criteria);

		Update updateOps = new Update()
                .set("userId", statement.getUserId())
                .set("fileName", statement.getFileName())
                .set("createdDate", statement.getCreatedDate())
                .set("content", statement.getContent());

		UpdateResult updateResult = template.upsert(query, updateOps, "monthly_statements");

        return updateResult;
    }


    /*
	 * db.games.find({ 
	 * 	name: { $regex: name, $options: "i" }
	 * }).projection({ gid: 1, name: 1 })
	 */
	// public List<GameSummary> findGamesByName(String name) {
	// 	Criteria criteria = Criteria.where("name").regex(name, "i");
	// 	Query query = Query.query(criteria);
	// 	query.fields().include("gid", "name");
	// 	return template.find(query, Document.class, "games").stream()
	// 		.map(doc -> new GameSummary(
	// 					doc.getInteger("gid", 0), doc.getString("name"))
	// 		).toList();
	// }

	// /* Joining games and comments on gid, then sort the results by descending order of rating,
	// //finally limit the results to three documents
	// 	db.games.aggregate([
	// 	  { $match: { gid: 233078 } },
	// 	  { $lookup: {
	// 			from: 'comments',
	// 			foreignField: 'gid',
	// 			localField: 'gid',
	// 			as: 'comments',
	// 			pipeline: [
	// 			  { $sort: { rating: -1 } },
	// 			  { $limit: 3 }
	// 			]
	// 		} }
	// 	])
	//  */
	// public Optional<GameDetail> getGameDetaisAndComments(int gameId) {
	// 	MatchOperation findGameByGid = Aggregation.match(Criteria.where("gid").is(gameId));

	// 	SortOperation sortByRating = Aggregation.sort(Direction.DESC, "rating");
	// 	LimitOperation take5 = Aggregation.limit(5);
	// 	LookupOperation getCommentsForGame = LookupOperation.newLookup()
	// 			.from("comments")
	// 			.localField("gid")
	// 			.foreignField("gid")
	// 			.pipeline(sortByRating, take5)
	// 			.as("comments");

	// 	Aggregation pipeline = Aggregation.newAggregation(findGameByGid, getCommentsForGame);
	// 	List<Document> results = template.aggregate(pipeline, "games", Document.class).getMappedResults();

	// 	if (results.isEmpty())
	// 		return Optional.empty();

	// 	Document doc = results.getFirst();
	// 	List<Comment> comments = doc.getList("comments", Document.class)
	// 			.stream()
	// 			.map(d -> {
	// 				Comment comment = new Comment(d.getString("user"), d.getInteger("gid")
	// 						, d.getInteger("rating"), d.getString("c_text"));
	// 				return comment;
	// 			}).toList();

	// 	return Optional.of(
	// 		new GameDetail(doc.getInteger("gid"), doc.getString("name")
	// 			, doc.getString("image"), doc.getString("url"), comments)
	// 	);
	//}
      /*db.tv_shows.updateOne(
        { title: “Arrow” },
        {   $push: { genres: “Mystery” },
            $pop: { genres: -1 }, 
            //1 removes from the back, element with the largest index
            -1 removes from the front, element with the 0 index
        }
    Query query= Query.query(Criteria.where(“title”).is(“Arrow”));
    Update updateOps= new Update()
            .push(“genres”).each(“Mystery”)
            .pop(“genres”, Update.Position.FIRST);
    UpdateResult updateResult= mongoTemplate.updateMulti(
                    query, updateOps, Document.class, “tv_shows”);
    System.out.printf(“Documents updated: %d\n”,
    updateResult.getModifiedCount());
    ) */

}


