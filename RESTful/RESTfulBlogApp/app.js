//Environment

var express = require("express"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose = require("mongoose"),
	expressSanitizer = require("express-sanitizer"),
	app = express();

// APP CONFIG
mongoose.set('useUnifiedTopology',true);
mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser: true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// MONGOOSE/ MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: 		String,
	image: 		String,
	body: 		String,
	created:	{type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "Y va el tercero...",
// 	image: "https://lapaginamillonaria.com/__export/1549475160889/sites/lpm/img/2019/02/06/gettyimages-1070847266_crop1549474376774.jpg_423682103.jpg",
// 	body: "Se adelanta Pavoon, se cieerraaaaaaaa, Armaaaaniii, el taco NO. Hace la personal y se va, se va, se viene, Martinez para el gol y va el tercero, y va el tercero, y va el tercero y gol de River, gol de Riveeeeeer, GOOOOOOOOOOOOOOOOOOOOOOOOOOL!"
// });

// RESTful ROUTES


app.get("/",(req,res)=>{
	res.redirect("/blogs");
})

//INDEX ROUTE
app.get("/blogs",(req,res)=>{
	Blog.find({},(err,blogs)=>{
		if(err){
			console.log("ERROR!");
			console.log(err);
		}else{
			res.render("index",{blogs: blogs});
		};
	});
});

//NEW ROUTE
app.get("/blogs/new",(req,res)=>{
	res.render("new");
});

//CREATE ROUTE
app.post("/blogs",(req,res)=>{
	//The next line is for security. It sanitizes the body of the blog
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog,(err, newBlog)=>{
		if(err){
			res.render("new");
		}else{
			//then redirect to INDEX
			res.redirect("/blogs");
		}
	})
});

//SHOW ROUTE
app.get("/blogs/:id",(req,res)=>{
	Blog.findById(req.params.id,(err,foundBlog)=>{
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("show",{blog: foundBlog});
		};
	});
});

//EDIT ROUTE

app.get("/blogs/:id/edit",(req,res)=>{
	Blog.findById(req.params.id,(err,foundBlog)=>{
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("edit",{blog: foundBlog});
		};
	});
});

// UPDATE ROUTE

app.put("/blogs/:id",(req,res)=>{
	//The next line is for security. It sanitizes the body of the blog
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err,updatedBlog)=>{
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs/"+ req.params.id);
		};
	});
});

//DELETE ROUTE

app.delete("/blogs/:id",(req,res)=>{
	//destroy blog
	Blog.findByIdAndRemove(req.params.id,(err)=>{
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs");
		};
	});
});

// SERVER SERVING ON PORT 3000

app.listen(3000,()=>{
	console.log("SERVER IS RUNNING!");
});