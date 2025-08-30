// // //userModel.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: { type: Number, required: false }, // ✅ Optional — only used for Student->User mapping
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, default: null },
  role: { type: String, default: "L1" },
});

module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   id: Number,
//   name: String,
//   email: { type: String, unique: true },
//   password: { type: String, default: null },
//   role: { type: String, default:"School Manager" },
// });

// module.exports = mongoose.model("User", userSchema);


// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: { type: String, default: null },
//   role: {
//     type: String,
//   },
// });

// module.exports = mongoose.model("User", userSchema);
