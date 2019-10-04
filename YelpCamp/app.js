//-----------------ENVIRONMENT AND SETUP-------------------//
const express 		= require("express"),
	  app 			= express(),
	  bodyParser 	= require("body-parser"),
	  mongoose	 	= require("mongoose"),
	  Campground 	= require("./models/campground"),
	  Comment		= require("./models/comment"),
	  seedDB		= require("./seeds");
	  


mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname +"/public"));
seedDB();

//------------ROUTES----------------------//

app.get("/",(req,res)=>{
	res.render("landing");
});

//INDEX ROUTE - Show all the campgrounds
app.get("/campgrounds",(req,res)=>{
	// Get all campgrounds from DB
	Campground.find({},(err,allCampgrounds)=>{
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index",{campgrounds: allCampgrounds});
		};
	});
});

//CREATE ROUTE - Add a campground to the DB
app.post("/campgrounds",(req, res)=>{
	// get data from form and add to campgrounds array
	const name = req.body.name;
	const image = req.body.image;
	const desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	//Create a new campground and save to the database
	Campground.create(newCampground,(err,newCreated)=>{
		if(err){
			console.log(err);
		}else{
			// redirect back to campgrounds page
			console.log("New Campground succesfully created");
			res.redirect("/campgrounds");
		};
	});
});

//NEW ROUTE - Show form to create the campground
app.get("/campgrounds/new",(req, res)=>{
	res.render("campgrounds/new");
});

//SHOW ROUTE => /campgrounds/:id <= - Shows info about one dog

app.get("/campgrounds/:id",(req,res)=>{
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

//============================
// 		COMMENTS ROUTES
//============================
// NEW ROUTE

app.get("/campgrounds/:id/comments/new",(req,res)=>{
	//find campground id
	Campground.findById(req.params.id,(err,campground)=>{
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground: campground});
		};
	});
});

app.post("/campgrounds/:id/comments",(req,res)=>{
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
					campground.comments.push(comment);
					campground.save();
					//redirect to campground show page
					res.redirect("/campgrounds/"+campground._id);
				};
			});
		};
	});
});

//SERVER SERVING ON PORT 3000
app.listen(3000,function(){
	console.log("Serving on port 3000 the YelpCamp App");
});