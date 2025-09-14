const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserModel = require("../models/userModel")

//getting the signup form


router.get("/rights", (req, res) => {
  res.render("rights", { title: "sign up page" });
});

router.post("/rights", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    // after saving, go to login page
    console.log(req.body);
    let existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("This email has already been used before!");
    } else {
      const user = new UserModel(req.body);
      await UserModel.register(user, req.body.password, (error) => {
        if (error) {
          throw error;
        }
        res.redirect("/login");
      });
    }
  } catch (error) {
    res.status(400).send("Please just try again!");
  }
  //added this.res.redirect that directs me to the login page after registering
});

router.get("/login", (req, res) => {
  res.render("login",{title: "login page"});
});

router.post("/login", passport.authenticate("local",{failureRedirect:'/login'}), (req, res) => {
  req.session.user = req.user;
  if(req.user.role === "Manager"){
    res.redirect("/main")
  }else if(req.user.role === "attendant"){
res.redirect('/Addsale')
  }else (res.redirect("nonuser"))
  });

router.get("/logout", (req, res) => {
  if (req.session){
    req.session.destroy((error)=>{
      if (error){
        return res.status(500).send('Error loggingout')
      }
      res.redirect('/login')
    })
  }
});

// router.post("/logout", (req, res) =>{
//  req.logout((error)=>{
//   if (error){
//     return res.status(500).send('Error loggingout')
//   }
//   res.redirect('/')
// })
//  });













module.exports = router;


