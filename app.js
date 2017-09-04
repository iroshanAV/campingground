var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose =require("mongoose");



mongoose.connect("mongodb://help:help123@ds121674.mlab.com:21674/help_camo");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs")


//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name:String,
  image:String,
  description:String
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create(
//   {name: "Kandy", 
//   image:"https://lanka.com/wp-content/uploads/2014/03/sri-dalada-maligawa-kandy-sri-lanka-8.jpg",
//   description:"Best place to visit in central province."
// },function(err,Campground){
//     if(err){
//       onsole.log(err);
//     }else{
//       console.log("Newly created campground");
//       console.log(Campground);
//     }
//   });










app.get("/", function(req,res){
  res.render("landing");
});

app.get("/campgrounds", function(req,res){
//get all campgrounds from DB
Campground.find({},function(err,allCampgrounds){
  if(err){
     console.log(err);
  }else{
  res.render("index",{campgrounds:allCampgrounds});

  }
});
});


app.post("/campgrounds",function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampGround = {name:name,image:image,description:desc}
  //create a new campground and save to DB
  Campground.create(newCampGround, function(err,newlyCreated){
   if(err){
     console.log(err);
   }else{
      //redirect back to campgrounds page
     res.redirect("/campgrounds");
   }
  });
 
  
});




app.get("/campgrounds/new",function(req,res){
res.render("new.ejs");
});


//Shows more information about campgrounds
app.get("/campgrounds/:id",function(req,res){
  //find the campgrounds with provided id
  Campground.findById(req.params.id,function(err,foundCampground){
if(err){
  console.log(err);
}else{
 //render show template
res.render("show",{campground:foundCampground});
}
  });

  
});

app.listen(3000,function(){
 console.log("yeay");
});