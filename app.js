var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose =require("mongoose");
var Campground = require("./models/campground.js");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
// var User = require("./models/user");



mongoose.connect("mongodb://help:help123@ds121674.mlab.com:21674/help_camo");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

seedDB();


//Passport configuration
app.use(require("express-session")({
  secret: "hhih",
  resave: false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
});


app.get("/", function(req,res){
  res.render("landing");
});

app.get("/campgrounds", function(req,res){

//get all campgrounds from DB
Campground.find({},function(err,allCampgrounds){
  if(err){
     console.log(err);
  }else{
  res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});

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

app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req,res){
  //find campground by id
  Campground.findById(req.params.id,function(err,campground){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new",{campground:campground});
    }

  });
    // res.render("comments/new");
});


app.post("/campgrounds/:id/comments", isLoggedIn ,function(req,res){
//lookup campgrounds using ID
Campground.findById(req.params.id,function(err,campground){
  if(err){
    console.log(err);
    res.redirect("/campgrounds");
  }else{

   Comment.create(req.body.comment,function(err,comment){
   if(err){
     console.log(err);
     console.log(campground);
   }else{
     campground.comments.push(comment);
     campground.save();
     res.redirect("/campgrounds/"+campground._id);
   }
   });
  }
});

//create new comment

//connect new comment to campground

//redirect campground show page
});



//===============
// AUTH ROUTES
//===============


//Show register form
app.get("/register",function(req,res){
  res.render("register");
});


//signup logic
app.post("/register",function(req,res){
  var newUser = new User({username:req.body.username});
  User.register(newUser,req.body.password,function(err,user){
     if(err){
       console.log(err);
       return res.render("register");
     }
     passport.authenticate("local")(req,res,function(){
       res.redirect("/campgrounds");
     })
  })
});




//show login form
app.get("/login", function(req,res){
  res.render("login");
});


//verify login
app.post("/login",passport.authenticate("local",{
  successRedirect: "/campgrounds",
  failureRedirect: "/login"

}), function(req,res){
  
});


//logic route
app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/campgrounds");
});


function isLoggedIn(req,res,next){
if(req.isAuthenticated()){
return next();
}
res.redirect("/login");
}


app.listen(3000,function(){
 console.log("yeay");
});