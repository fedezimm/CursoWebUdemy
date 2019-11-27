var express 	= require("express"),
	router 		= express.Router({mergeParams: true}),
	Campground 	= require("../models/campground"),
	Comment		= require("../models/comment"),
	middleware  = require("../middleware");

//============================
// 		COMMENTS ROUTES
//============================

// NEW ROUTE
router.get("/new",middleware.isLoggedIn,(req,res)=>{
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
router.post("/",middleware.isLoggedIn,(req,res)=>{
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
					req.flash("success","Successfully added comment!");
					res.redirect("/campgrounds/"+campground._id);
				};
			});
		};
	});
});

// EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership,(req,res)=>{
	Comment.findById(req.params.comment_id,(err,foundComment)=>{
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit",{campground_id:req.params.id, comment:foundComment});
		};
	});
});

//UPDATE ROUTE
router.put("/:comment_id",middleware.checkCommentOwnership,(req,res)=>{
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,(err,updatedComment)=>{
		if(err){
			res.redirect("back");
		}else{
			req.flash("success","Successfully updated comment!");
			res.redirect("/campgrounds/"+req.params.id);
		};
	});
});

// DESTROY ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership,(req,res)=>{
	Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
		if(err){
			res.redirect("back");
		}else{
			req.flash("success","Successfully deleted comment!");
			res.redirect("/campgrounds/"+req.params.id);
		};
	});
});

module.exports =router;