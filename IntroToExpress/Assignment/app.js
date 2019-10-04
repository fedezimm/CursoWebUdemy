var express = require("express");
var app = express();

app.get("/",function(req,res){
	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal",function(req,res){
	var animal =req.params.animal.toLowerCase();
	var sounds ={
		dog: "'Woof Woof!'",
		cat: "'Meow!'",
		pig: "'Oink oink!'",
		cow: "'Mooooo!'",
		chicken: "'kikirikiiii!!'"
	};
	res.send("The "+animal+" says "+sounds[animal]);
});

app.get("/repeat/:word/:times",function(req,res){
	var word=req.params.word;
	var times=req.params.times;
	var resp="";
	for(var i=0;i<times-1;i++){
		resp+=word+" ";
	};
	resp+=word;
	res.send(resp);
});

app.get("*",function(req,res){
	res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});