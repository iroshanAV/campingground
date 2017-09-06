var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author: String,
    description: String,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

module.exports = mongoose.model("Comment",commentSchema);