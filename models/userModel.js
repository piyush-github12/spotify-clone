var mongoose = require("mongoose");
var plm = require("passport-local-mongoose");


var userSchema = mongoose.Schema({
  username: String,
  email: String,
  contact: String,
  playlists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "playlists",
    },
  ],
  liked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  profileImage: {
    type: String,
    default: "/images/default.png",
    
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);
