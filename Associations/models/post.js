var mongoose = require("mongoose");

// POST - title, content
//Defining Post Schemaa
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

//Adding that Schema to a model called 'Post' (will generate a collection in db called 'posts') and then we export that.
module.exports = mongoose.model("Post",postSchema);