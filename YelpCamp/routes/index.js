var express 	= require("express"),
	router 		= express.Router(),
	passport	= require("passport"),
	User 		= require("../models/user");


//root route

router.get("/",(req,res)=>{
	res.render("landing");
});

// ====================================
// AUTH ROUTES
// ====================================

//REGISTER ROUTES

//SHOW REGISTER FORM
router.get("/register",(req,res)=>{
	res.render("register");
})

//HANDLE SIGN UP LOGIC
router.post("/register",(req,res)=>{
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user)=>{
		if (err){
			console.log(err);
			return res.render("register")
		};
		passport.authenticate("local")(req, res, ()=>{
			res.redirect("/campgrounds");
		});
	});
});

//LOGIN ROUTES

//show the login form
router.get("/login",(req,res)=>{
	res.render("login");
});

//handle the login logic
router.post("/login",passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}),(req,res)=>{
}); 

//LOGOUT ROUTE
router.get("/logout",(req,res)=>{
	req.logout();
	res.redirect("/campgrounds")
});

//==============================================
//			Middleware "IsLoggedIn"
//==============================================

function isLoggedIn(req,res,next){
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
};


module.exports = router;