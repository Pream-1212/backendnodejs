const express = require("express");
const router = express.Router ();
const mongoose = require("mongoose");

// const multer = require("multer");
// const {ensureAuthenticated, ensureManager} = require("../middleware/auth.js");

const StockModel = require("../models/stockModel");

// // image upload configs
// let storage = multer.diskStorage({
//     destination: (req,file,cb) => {
//       cb(null, 'public/uploads/')
//     },
//     filename: (req,file,cb) => {
//       cb(null, Date.now() + '-' + file.originalname)
//     }
//   });
//   const upload = multer({storage: storage});
//   //ensureaunthenticated, ensureManager
router.get("/stock", (req,res)=>{
    res.render("stock");
});

router.post("/stock", async (req, res) => {
  // this route helps to post data in the terminal
  try {
    const stock = new StockModel(req.body);
     // Save the file path to the database
    console.log(req.body);
    await stock.save(); 
    res.redirect("/stocklist");
  }catch (error){
  console.error(error);
  res.redirect('/stock');
  }
});

//getting stock from the database

router.get("/main", (req, res) => {
  res.render("main");
});

router.get("/stocklist", async (req,res)=>{
  try {
    let items = await StockModel.find().sort({ $natural: -1 });
    res.render("stocktable", {items});  //pass as object
  } catch (error) {
    console.error("Error fetching items", error.message);
    res.status(400).send('Unable to find data in the database.');
  }
});

//updating stock
router.get("/editstock/:id", async(req,res) =>{
  let item = await StockModel.findById(req.params.id);
  // console.log(item)
  res.render(`editstock`,{item});
});


router.post("/editstock/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid stock ID");
  }

  try {
    const updated = await StockModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.redirect("/stocklist");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// router.delete("/stocklist/:id", async (req,res) =>{
//   try {
//    await StockModel.findByIdAndDelete(req.params.id);    
//     res.redirect('/stocklist')
//   } catch (error) {
//       return res.status(500).send("error deleting product.")
//      }
// });
router.post("/deletestock", async (req, res) => {
  try {
    await StockModel.deleteOne({_id:req.body.id});
    res.redirect("stocklist");
  }catch (error) {
    res.status(400).send("Unable to delete item from the database.");
  }
});







module.exports = router;