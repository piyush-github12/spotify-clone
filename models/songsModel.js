var mongoose = require("mongoose");

var songsSchema = mongoose.Schema({
    title: String,
    artist: String,
    album: String,
    category: [
        {
            type:String,
            enum : [ 'punjabi ', 'gujrati']
        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    size: Number,
    poster:String,
    filename : {
        type: String,
        required : true,
    },
})

module.exports = mongoose.model("song", songsSchema)