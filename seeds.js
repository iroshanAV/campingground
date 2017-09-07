var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");



var data = [
    {
    name: "Matara",
    image: "https://i.ytimg.com/vi/cXKMMjWifaw/maxresdefault.jpg",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
    },
    {
        name: "Bentota",
        image:"http://www.leisureisland.lk/assets/images/bentota1.jpg",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
    },
    {
        name: "Negambo",
        image: "http://holidaysinsrilanka.net/images/159-The_West_Coast___Negombo-154590-Main_banner-TWC-Negombo.jpg",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
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