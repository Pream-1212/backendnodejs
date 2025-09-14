const express = require("express");
const router = express.Router ();
const mongoose = require("mongoose");
const UserModel = require("../models/userModel");

router.get("/rights1", (req,res)=>{
    res.render("rights");
});

router.post("/rights1", async (req, res)=>{
    // this route helps to post data in the terminal
    try {
        const rights = new UserModel(req.body);
        //Save the file path to the database
        console.log(req.body);
        await rights.save();
        res.redirect("/userssection");
    }catch (error){
    console.error(error);
    res.redirect('/rights1');
    }
});
//getting users from the database

// router.get("/main", (req, res) => {
//     res.render("main");
//     });

router.get("/userssection", async (req,res)=>{
    try {
        let items = await UserModel.find().sort({ $natural: -1 });
        res.render("userstable", {items});  //pass as object
    } catch (error) {
        console.error("Error fetching items", error.message);
        res.status(400).send('Unable to find data in the database.');
    }
});

//updating users
router.get("/edituser/:id", async(req,res) =>{
    let item = await UserModel.findById(req.params.id);
    // console.log(item)
    res.render(`edituser`,{item});
});

router.post("/edituser/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid user ID");
    }

    try {
        const updated = await UserModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.redirect("/userssection");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }           
});

//deleting users
router.post('/deleteuser/:id', async (req, res) => {
    try {
        await UserModel.deleteOne({_id: req.params.id});
        res.redirect('/userssection');
    } catch (error) {
        res.status(400).send("Unable to delete user from database");
    }
});



























module.exports = router;