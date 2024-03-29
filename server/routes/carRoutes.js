const express = require("express");
const router = express.Router();
const { getallcars, addcar, editcar, deletecar, getsinglecar } = require("../controllers/carControllers");

const { protect, isAdmin } = require('../Middleware/authMiddleware')

// getallcars
router.get("/getallcars", protect, getallcars);

// addcar
router.post("/addcar", protect,isAdmin, addcar);

// editcar
router.put("/editcar/:id", protect,isAdmin, editcar);

// deletecar
router.delete("/deletecar/:id", protect,isAdmin, deletecar);

// get single car
router.get("/cardetails/:id", protect, getsinglecar);


module.exports = router;
