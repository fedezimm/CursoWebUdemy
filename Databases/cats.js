var mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/cat_app",{useNewUrlParser:true});

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat",catSchema);

//adding a new cat to the DB

// var george = new Cat({
// 					name:"George",
// 					age:11,
// 					temperament:"Grouchy"
// });

// george.save((err,cat)=>{
// 	if(err){
// 		console.log("Something went wrong!!");
// 	}else{
// 		console.log("We just saved a cat to the db");
// 		console.log(cat);
// 	};
// });

Cat.create({
	name:"Snow White",
	age:15,
	temperament:"Bland"
},(err,cat)=>{
	if(err){
		console.log("Oh no..This is an error!");
		console.log(err);
	}else{
		console.log("Cat succesfully created!");
		console.log(cat);
	};
});
//retrieve all cats from the DB and console.log each one

Cat.find({},(err,cats)=>{
	if(err){
		console.log("an error has acurred!");
		console.log(err);
	}else{
		console.log("All te cats:");
		console.log(cats);
	};
});