var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/campgrounds", function(req,res){
    
    //get all campgrounds from DB
    Campground.find({},function(err,allCampgrounds){
      if(err){
         console.log(err);
      }else{
      res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
    
      }
    });
    });
    
    
    router.post("/campgrounds",function(req,res){
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
    
    
    
    
    router.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
    });
    
    
    //Shows more information about campgrounds
    router.get("/campgrounds/:id",function(req,res){
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
    

    module.exports = router;