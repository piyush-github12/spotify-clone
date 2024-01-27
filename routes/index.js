var express = require("express");
const userModel = require("../models/userModel");
const songsModel = require("../models/songsModel");
const playlistsModel = require("../models/playlistsModel");
const passport = require("passport");
var router = express.Router();
var multer = require("multer");
var id3 = require("node-id3");
const { Readable } = require("stream");
var crypto = require("crypto");

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/passport-2db")
  .then(() => {
    console.log("conected to database ");
  })
  .catch((err) => {
    console.log(err);
  });

const conn = mongoose.connection;
var gfsBucket, gfsBucketPoster;

conn.once("open", () => {
  gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "audio",
  });
  gfsBucketPoster = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "poster",
  });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("register");
});
router.get("/profile", function (req, res, next) {
  res.render("profile");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  function (req, res, next) {}
);
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});
router.post("/register", function (req, res, next) {
  var newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
  });

  userModel
    .register(newUser, req.body.password)
    .then(function (u) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    })
    .catch(function (e) {
      res.send(e);
    });
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin) return next();
  else return res.redirect("/");
}

//upload music
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/uploadmusic", isLoggedIn, isAdmin, (req, res, next) => {
  res.render("index");
});
router.post(
  "/uploadmusic",
  isLoggedIn,
  isAdmin,
  upload.array("song"),
  async (req, res, next) => {
    await Promise.all(
      req.files.map(async (file) => {
        const randomName = crypto.randomBytes(20).toString("hex");
        const songdata = id3.read(file.buffer);

        Readable.from(file.buffer).pipe(
          gfsBucket.openUploadStream(randomName)
        );
        Readable.from(songdata.image.imageBuffer).pipe(
          gfsBucketPoster.openUploadStream(randomName + "poster")
        );

        await songsModel.create({
          title: songdata.title,
          artist: songdata.artist,
          album: songdata.album,
          size: file.size,
          poster: randomName + "poster",
          filename: randomName,
        });
      })
    );

    res.send("song uploaded");
  }
);

module.exports = router;
