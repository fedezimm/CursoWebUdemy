// all the middleware goes here
var middlewareObj = {},
	Campground  = require("../models/campground"),
	Comment 	= require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,(err,foundCampground)=>{
			if(err){
				req.flash("error", "Sorry, we could not find that Campground. It is possible it was deleted.");
				res.redirect("back");
			}else{
				//does user own the campground
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","Sorry, you don't have permission to do that.");
					res.redirect("back");
				}	
			};
		});
	}else{
		req.flash("error","You need to be logged in to do that.");
		res.redirect("back");
	};
}

middlewareObj.checkCommentOwnership = function (req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,(err,foundComment)=>{
			if(err){
				req.flash("error", "Something went wrong :( ")
				res.redirect("back");
			}else{
				//does user own the comment
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","You don't have permission to do that");
					res.redirect("back");
				}	
			};
		});
	}else{
		req.flash("error","You need to be logged in to do that.");
		res.redirect("back");
	};
};

middlewareObj.isLoggedIn = function (req,res,next){
	if (req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that.");
	res.redirect("/login");
};


module.exports = middlewareObj