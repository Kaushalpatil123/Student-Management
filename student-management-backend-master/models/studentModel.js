const mongoose = require("mongoose");
const Counter = require("./counterModels");

const studentSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    admissiondate: {
      type: Date,
      required: false,
    },
    rollno: {
      type: String,
      required: false,
      unique: true,
    },
    fname: {
      type: String,
      required: false,
    },
    lname: {
      type: String,
      required: false,
    },
    mothername: {
      type: String,
      required: false,
    },
    fathername: {
      type: String,
      required: false,
    },
    dob: {
      type: Date,
      required: false,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    standard: {
      type: String,
      required: false,
    },
    bloodgroup: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    subjects: {
      type: [String],
      required: false,
    },
    gender: {
      type: String,
      required: true,
    },
    maritialstatus: {
      type: String,
      required: false,
    },
    physicallydisabled: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to auto-increment 
studentSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: "studentId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id = counter.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

studentSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Student", studentSchema);
