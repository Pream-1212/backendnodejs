const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const moment = require("moment");

const addsalesModel = require("../models/addsalesModel.js"); // adjust path

// GET all sales and render page
// router.get("/Addsale", async (req, res) => {
//   try {
//     const sales = await salesModel.find();
//     res.render("sales", { title: "Sales Entry", sales });
//   } catch (err) {
//     console.error("Error fetching sales:", err.message);
//     res.status(500).send("Error fetching sales");
//   }
// });


router.get("/Addsale", (req, res) => {
  res.render("sales", { title: "sales page" });
});

// POST new sale
// router.post("/Addsale", async (req, res) => {
//   try {
//     const sale = new addsalesModel(req.body);
//     console.log(req.body);
//     const savedSale = await sale.save();

//     console.log("Saved sale:", savedSale);

//     // Fetch all sales after saving to render updated table
//     const sales = await addsalesModel.find();
//     res.render("sales", { title: "Sales Entry", sales });
//   } catch (err) {
//     console.error("Save error:", err.message);
//     res.status(400).send("Error saving sale: " + err.message);
//   }
// });


router.post("/Addsale", async (req, res) => {
  try {
    const sale = new addsalesModel(req.body);
    console.log(req.body);
    await sale.save();
    res.redirect("/salesdata");
  } catch (error) {
    console.error(error);
    res.redirect("/Addsale");
  }
});

router.get("/salesdata", async (req,res)=>{
    try {
        let items = await addsalesModel.find().sort({ $natural: -1 });
        res.render("salestable", {items,moment});  //pass as object
    } catch (error) {
        console.error("Error fetching items", error.message);
        res.status(400).send('Unable to find data in the database.');
    }
});

//updating sales
router.get("/editsales/:id", async(req,res) =>{
    let item = await addsalesModel.findById(req.params.id);
    // console.log(item)
    res.render(`editsales`,{item});
});

router.post("/editsales/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid sales ID");
    }

    try {
        const updated = await addsalesModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.redirect("/salesdata");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }           
});

//deleting users
router.post('/deletesales/:id', async (req, res) => {
    try {
        await addsalesModel.deleteOne({ _id: req.params.id });
        res.redirect('/salesdata');
    } catch (error) {
        res.status(400).send("Unable to delete sales from database");
    }
});




module.exports = router;
