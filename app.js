var express = require("express");
var app = express();
var bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs")

var campgrounds = [
    {name: "Colombo", image:"http://www.colombocityguide.com/image/colombo1.jpg"},
    {name: "Kandy", image:"https://lanka.com/wp-content/uploads/2014/03/sri-dalada-maligawa-kandy-sri-lanka-8.jpg"},
    {name: "Galle", image:"http://www.srilankainstyle.com/wp-content/themes/SLIS/timthumb.php?src=http://www.srilankainstyle.com/wp-content/uploads/2014/04/galle-fort-4.jpg&h=450&w=1000&zc=1"}
];


app.get("/", function(req,res){
  res.render("landing");
});

app.get("/campgrounds", function(req,res){


 res.render("campgrounds",{campgrounds:campgrounds});
});


app.post("/campgrounds",function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var newCampGround = {name:name,image:image}
  campgrounds.push(newCampGround);
  res.redirect("/campgrounds");
});


app.get("/campgrounds/new",function(req,res){
res.render("new.ejs");
});

app.listen(3000,function(){
 console.log("yeay");
});