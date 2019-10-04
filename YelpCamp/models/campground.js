var mongoose = require("mongoose");

// CAMPGROUND MODEL
//Defining the schema
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});
//Exporting the model
module.exports = mongoose.model("Campground", campgroundSchema);