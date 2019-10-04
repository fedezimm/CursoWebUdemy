var express = require("express");
var app = express();
 

// "/" => "Hi there!"
app.get("/",function(req,res){
	res.send("Hi there you guys!");
});

// "bye/ => "Goodbye"
app.get("/bye", function(req,res){
	res.send("Goodbye");
});

app.get("/dog",function(req,res){
	console.log("Someone made a request to /dog");
	res.send("MEOW!");
});

app.get("/r/:subredditName",function(req,res){
	var subreddit = req.params.subredditName
	res.send("Welcome to the "+ subreddit + " page")
});

app.get("/r/:subredditName/comments/:id/:title",function(req,res){
	var subreddit = req.params.subredditName;
	var id = req.params.id;
	var title = req.params.title;
	res.send("Welcome to the "+subreddit+" comments page of the new of id: "+id+" and title: "+title);
});

app.get("*",function(req,res){
	res.send("This page is not found.");
});

app.listen(3000,function(){
	console.log("Serving on port 3000");
})
//Tell Express to listen for requests (start server)
