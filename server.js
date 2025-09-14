//1.Dependencies

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")
const moment = require("moment");
const methodOverride = require("method-override");
const multer = require("multer");

require("dotenv").config();
//import model
const UserModel = require("./models/userModel");

//import routes

// const classRoutes = require("./routes/classRoutes");
const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");
const salesRoutes = require("./routes/salesRoutes");
const usersRoutes = require("./routes/usersRoutes");
//2.Instantiations

const app = express();
const port = 3000;

//3.Configurations
//setting upmongodb connection

mongoose.connect(process.env.MONGODB_URL, {

  // useNewUrlParser: true,
  // useUnifiedTopology: true,

});

mongoose.connection
  .on("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.log(`Connection error: ${err.message}`);
  });

  // setting view engine to pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//4.Middle ware
// app.use(express.static("public"));  //static files

app.use(express.static(path.join(__dirname,"public")));  //static files
// app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(express.urlencoded({extented:true})); // helps to pass data from forms
app.use(express.json());
//express session configs

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store:MongoStore.create({mongoUrl:process.env.MONGODB_URL}),
    cookie:{maxAge:24*60*60*1000}  //one day
  })
);
//passport configs

app.use(passport.initialize()); //looks out passport.authenticate
app.use(passport.session()); //connects passport to the session created by

//authenticate with passportlocal strategy

passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// 5.routing

//using imported routes

// app.use("/", classRoutes);
app.use("/", authRoutes);
app.use("/", stockRoutes);
app.use('/', salesRoutes);
app.use("/", usersRoutes);



//path parameters and query strings
//path params
// app.get(`/pathparams/:username`, (req, res) => {
//   res.send(`this is the username ` + req.params.username);
// });

//query strings
// app.get("/students", (req, res) => {
//   res.send(
//     `This is  ` +
//       req.query.name +
//       ` from cohort ` +
//       req.query.cohort +
//       ` class of ` +
//       req.query.class +
//       ` she is ` +
//       req.query.gender
//   );
// });

//app.METHOD(PATH, HANDLER);
//SERVING HTML FILES
//Home page route

//non existent route handler  the 2nd last one

app.use((req,res)=>{
  res.status(404).send("Oops!Route not found.");
});

//6.Bootstrapping Server
//this should always be the last line in this file.

app.listen(port, () => {
  console.log(`listening on port ${port}`)});
