var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	data = [
		{
			name: "Cloud's Rest",
		 	image:"https://www.xochitla.org.mx/galerias/parque/campamentos/campamento-en-xochitla.jpg",
		 	description:"asjdnaosdnas"
		},
		{
			name: "Desert Mesa",
			image:"https://cadenaser00.epimg.net/emisora/imagenes/2017/07/16/radio_valladolid/1500207636_921237_1500208292_noticia_normal.jpg",
			description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},
		{
			name:"Canyon Camp",
			image:"https://blog.liveandlearn.mx/wp-content/uploads/2018/08/campamentos-semana-santa-en-canada.jpg",
			description:"hey hey heeeey"
		}
	];

function seedDB(){
	//remove all campgrounds
	Campground.remove({},(err)=>{
		if(err){
			console.log(err);
		};
		console.log("All the campgrounds have been deleted!");
		//add a few campgrounds
		data.forEach((seed)=>{
			Campground.create(seed,(err,campground)=>{
				if(err){
					console.log(err);
				}else{
					console.log("added a campground");
					//create a comment
					Comment.create(
						{
							text:"This place is great, but i wish there was internet",
							author:"Homer"
						},(err,comment)=>{
							if(err){
								console.log(err);
							}else{
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment")
							};
						}
					);
				};
			});
		});
	});
};

module.exports = seedDB;
