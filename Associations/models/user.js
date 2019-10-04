var mongoose = require("mongoose");
//USER - email, name
//Defining User Schema
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}
	]
});

// Adding that Schema to a model called 'User' (will generate a collection in the db called 'users') and then we export that.
module.exports = mongoose.model("User",userSchema);