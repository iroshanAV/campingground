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
    
    
    router.post("/campgrounds",isLoggedIn, function(req,res){
      var name = req.body.name;
      var image = req.body.image;
      var desc = req.body.description;
      var author = {
        id: req.user._id,
        username : req.user.username
      };
      var newCampGround = {name:name,image:image,description:desc,author:author}
      console.log(req.user);
      //create a new campground and save to DB
      Campground.create(newCampGround, function(err,newlyCreated){
       if(err){
         console.log(err);
       }else{
          //redirect back to campgrounds page
          console.log("assasasasasasa"+newlyCreated);
         res.redirect("/campgrounds");
       }
      });
     
      
    });
    
    
    
    
    router.get("/campgrounds/new",isLoggedIn, function(req,res){
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
    

    function isLoggedIn(req,res,next){
      if(req.isAuthenticated()){
      return next();
      }
      res.redirect("/login");
      }
      


    module.exports = router;