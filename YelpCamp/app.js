//=========================================================
//-----------------ENVIRONMENT AND SETUP-------------------
//=========================================================
const express 			= require("express"),
	  app 				= express(),
	  bodyParser 		= require("body-parser"),
	  mongoose	 		= require("mongoose"),
	  passport 			= require("passport"),
	  LocalStrategy		= require("passport-local"),
	  methodOverride 	= require("method-override"),
	  Campground 		= require("./models/campground"),
	  Comment			= require("./models/comment"),
	  User				= require("./models/user"),
	  seedDB			= require("./seeds");

var commentRoutes 		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes			= require("./routes/index");


mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
// seed the database
// seedDB();

// ======================================
// 		PASSPORT CONFIGURATION
// ======================================

app.use(require("express-session")({
	secret: "River 3 Boca 1",
	resave: false,
	saveUninitialized: false
}));

app.use(passport. initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
	res.locals.currentUser = req.user;
	next();
});

//==================================================
// REQUERING ROUTES
//==================================================
app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds", campgroundRoutes);


//============================================
//		SERVER SERVING ON PORT 3000
//============================================

app.listen(3000,function(){
	console.log("Serving on port 3000 the YelpCamp App");
});