const express =require("express");
const router = express.Router ();
const path = require("path");
//syntax
router.get("/pream", (req, res) => {
  //
  res.sendFile(path.join(__dirname + "/../html/index.html"));
});


// router.get("/", (req, res) => {
//   // new
//   res.send("Homepage! Hello world.")
// });

router.get("/about", (req, res) => {
  // new
  res.send("About page. Nice.");
});

router.get("/pream", (req, res) => {
  // new
  res.send("Pream's page.");
});

router.post("/about", (req, res) => {
  res.send("Got a POST request");
});
router.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});
router.delete("/user", (req, res) => {
  res.send("Got a DELETE request at /user");
});

router.get("/about", (req, res) => {
  //
  res.send("About page");
});

//manager route
router.get("/manns", (req, res) => {
  res.sendFile(path.join(__dirname + "/../html/man.html"));
});

router.post("/man", (req, res) => {
  console.log(req.body);
});
// router.use((req, res, next) => {
//   console.log("A new request received at " + Date.now());
//   next();
// });

//be able to get the forms
router.get("/registeruser", (req, res) => {
  res.sendFile(path.join(__dirname + "/../html/form.html"));
});

// router.get(`/registeruser`, (req, res) => {
//   res.sendFile(__dirname + "/html/land.html");
// });

//post route
router.post("/registeruser", (req, res) => {
  console.log(req.body);
});


module.exports = router
