var express 	= require("express"),
	router 		= express.Router(),
	Campground	= require("../models/campground");


//======================================
//			CAMPGROUNDS ROUTES
//======================================

//INDEX ROUTE - Show all the campgrounds
router.get("/",(req,res)=>{
	// Get all campgrounds from DB
	Campground.find({},(err,allCampgrounds)=>{
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index",{campgrounds: allCampgrounds, currentUser:req.user});
		};
	});
});

//CREATE ROUTE - Add a campground to the DB
router.post("/",isLoggedIn,(req, res)=>{
	// get data from form and add to campgrounds array
	const name = req.body.name;
	const image = req.body.image;
	const desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, image: image, description: desc, author: author};
	//Create a new campground and save to the database
	Campground.create(newCampground,(err,newCreated)=>{
		if(err){
			console.log(err);
		}else{
			// redirect back to campgrounds page
			res.redirect("/campgrounds");
		};
	});
});

//NEW ROUTE - Show form to create the campground
router.get("/new",isLoggedIn,(req, res)=>{
	res.render("campgrounds/new");
});

//SHOW ROUTE => /campgrounds/:id <= - Shows info about one dog

router.get("/:id",(req,res)=>{
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
		if(err){
			console.log(err);
		}else{
			console.log(foundCampground);
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		};
	});
});


//EDIT CAMPGROUND ROUTE

router.get("/:id/edit", (req,res)=>{
	Campground.findById(req.params.id,(err,foundCampground)=>{
		if(err){
			res.redirect("/campgrounds")
		} else{
			res.render("campgrounds/edit", {campground: foundCampground});
		};
	});
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id",(req,res)=>{
	//find and update the correct campground

	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
		if (err){
			res.redirect("/campgrounds");
		}else{
			//redirect somewhere
			res.redirect("/campgrounds/" + req.params.id);
		};
	});
	
});

//DESTROY CAMPGROUNDS

router.delete("/:id",(req,res)=>{
	Campground.findByIdAndRemove(req.params.id,(err)=>{
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		};
	});
});

//middleware
function isLoggedIn(req,res,next){
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
};

module.exports = router;

