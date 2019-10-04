// mongoose setup
mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/blog_demo",{useNewUrlParser:true});

//USER - email, name and POST - title, content SCHEMAS
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

// USER AND POST MODEL
var User = mongoose.model("User",userSchema);
var Post = mongoose.model("Post",postSchema);

// var newUser = new User({
// 	email: "hermione@hogwarts.com",
// 	name: "Hermione Granger"
// });

// newUser.posts.push({
// 	title:"How to brew polyjuice potion",
// 	content:"Just Kidding, go to potion class to learn it"
// });

// newUser.save((err,user)=>{
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	};
// });

// var newPost = new Post({
// 	title:"Reflections of Apples",
// 	content:"they are delicious"
// });

// newPost.save((err,post)=>{
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(post);
// 	};
// });

User.findOne({name:"Hermione Granger"},(err,user)=>{
	if (err){
		console.log(err);
	}else{
		user.posts.push({
			title: "3 things I really hate",
			content:"Voldemort, Voldemort and Voldemort"
		});
		user.save((err,user)=>{
			if(err){
				console.log(err);
			}else{
				console.log(user);
			};
		});
	};
});