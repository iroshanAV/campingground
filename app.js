var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose =require("mongoose");
var Campground = require("./models/campground.js");
var seedDB = require("./seeds");
// var Comment = require("./models/comment.js");
// var User = require("./models/user");



mongoose.connect("mongodb://help:help123@ds121674.mlab.com:21674/help_camo");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs")
seedDB();

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
  res.render("campgrounds/index",{campgrounds:allCampgrounds});

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
res.render("campgrounds/new");
});


//Shows more information about campgrounds
app.get("/campgrounds/:id",function(req,res){
  //find the campgrounds with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
if(err){
  console.log(err);
}else{
  console.log(foundCampground);
 //render show template
res.render("campgrounds/show",{campground:foundCampground});
}
  });

});




// ===========================
//  Comments routes
// ===========================

app.get("/campgrounds/:id/comments/new",function(req,res){
  //find campground by id
  Campground.findById(req.params.id,function(err,campground){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new",{campground:campground});
    }

  });
     res.render("comments/new");
});



app.listen(3000,function(){
 console.log("yeay");
});