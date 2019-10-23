var express = require("express"),
	router 	= express.Router({mergeParams: true}),
	Campground = require("../models/campground"),
	Comment		= require("../models/comment");

//============================
// 		COMMENTS ROUTES
//============================

// NEW ROUTE
router.get("/new",isLoggedIn,(req,res)=>{
	//find campground id
	Campground.findById(req.params.id,(err,campground)=>{
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground: campground});
		};
	});
});

// CREATE ROUTE
router.post("/",isLoggedIn,(req,res)=>{
	//lookup campground suing ID
	Campground.findById(req.params.id,(err,campground)=>{
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			//create new comment
			Comment.create(req.body.comment,(err,comment)=>{
				if(err){
					console.log(err);
				}else{
					//connect new comment to campground
					//add id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					//redirect to campground show page
					console.log("Comentario: "+comment);
					res.redirect("/campgrounds/"+campground._id);
				};
			});
		};
	});
});


function isLoggedIn(req,res,next){
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
};

module.exports =router;