//1.Dependencies
const express = require("express");


//import routes
const classRoutes = require("./routes/classRoutes");
//2.Instantiations
const app = express();
const port = 3000;

//3.Configurations

//4.Middle ware
app.use(express.static("public"));  //static files

app.use(express.urlencoded({ extented: true })); // helps to pass data from forms

//Simple request time logger for a specific route
app.use("/pream", (req, res, next) => {
  console.log("A new request received at " + Date.now());
  next();
});

// Simple request time logger
// app.use((req, res, next) => {
//    console.log("A new request received at " + Date.now());

// next();
// });

// 5.routing

//using imported routes
app.use("/",classRoutes)







//path parameters and query strings
//path params
app.get(`/pathparams/:username`, (req, res) => {
  res.send(`this is the username ` + req.params.username);
});

//query strings
app.get("/students", (req, res) => {
  res.send(
    `This is  ` +
      req.query.name +
      ` from cohort ` +
      req.query.cohort +
      ` class of ` +
      req.query.class +
      ` she is ` +
      req.query.gender
  );
});

//app.METHOD(PATH, HANDLER);
//SERVING HTML FILES
//Home page route

//non existent route handler
app.use((req, res) => {
  res.status(404).send("Oops!Route  not found.");
});

//6.Bootstrapping Server
//this should always be the last line in this file.
app.listen(port, () => console.log(`listening on port ${port}`));
