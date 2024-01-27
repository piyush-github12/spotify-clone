var mongoose = require("mongoose");

var playlistsSchema = mongoose.Schema({

    name : {
        type:String,
        required: true ,
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    songs:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:'song'
        }
    ],
    poster: {
        type: String,
        default:'/images/defaultposter.jpg'
    }
})

module.exports = mongoose.model('playlist',playlistsSchema)