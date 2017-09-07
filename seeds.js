var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");



var data = [
    {
    name: "Matara",
    image: "https://i.ytimg.com/vi/cXKMMjWifaw/maxresdefault.jpg",
    description:"Best place to visit in south"
    },
    {
        name: "Bentota",
        image:"http://www.leisureisland.lk/assets/images/bentota1.jpg",
        description:"Amazing puppets"
    },
    {
        name: "Negambo",
        image: "http://holidaysinsrilanka.net/images/159-The_West_Coast___Negombo-154590-Main_banner-TWC-Negombo.jpg",
        description:"Good fish to buy"
    }
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed all the datas");
        
        //add few campgrounds 
    data.forEach(function(seed){
        Campground.create(seed, function(err,campground){
         if(err){
             console.log(err);
           
         }else{
             console.log("added");
            
             //create a campground
             Comment.create({
                 text: "This place is the best place to visit",
                 author: "Homer"
             },function(err,comment){
                   if(err){
                       console.log(err);
                       
                       
                   }
                   else{
               campground.comments.push(comment);
               campground.save();
               console.log("Created a new comment");
                       }
            
            });
         }
        });
       });
     Campground.create({})
    });

    
    //add few comments
}

module.exports = seedDB;