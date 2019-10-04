// mongoose setup
mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/blog_demo_2",{useNewUrlParser:true});

var Post = require("./models/post"),
	User = require("./models/user");


// Post.create({
// 		title:"How to cook the best Burguer - pt. 4?",
// 		content:"Parte 4 de como hacer hamburguesas"
// 	},(err,post)=>{
// 		User.findOne({email:"bob@gmail.com"},(err,foundUser)=>{
// 			if(err){
// 				console.log(err);
// 			}else{
// 				foundUser.posts.push(post);
// 				foundUser.save((err,data)=>{
// 					if(err){
// 						console.log(err)
// 					}else{
// 						console.log(data)
// 					};
// 				});
// 			};
// 		});
// 	}
// );

// User.create({
// 	email: "bob@gmail.com",
// 	name: "Bob Belcher"
// });

//find user
// find all posts for that user

User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err,user)=>{
	if(err){
		console.log(err);
	}else{
		console.log(user);
	};
});

