const mongoose = require("mongoose");

const StandardSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    standard: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Standard", StandardSchema);
