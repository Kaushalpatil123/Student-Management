const express = require("express");
const router = express.Router();
const {
  addStandard,
  getAllStandard,
  editStandard,
  deleteStandard,
} = require("../controller/standardController");

router.post("/add", addStandard);
router.get("/get", getAllStandard);
router.put("/edit/:id", editStandard);
router.delete("/delete/:id", deleteStandard);

module.exports = router;
