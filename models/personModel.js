const mongoose = require("mongoose");

const personsSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    bankAccount: {
      type: Number,
      unique: true,
      required: true,
    },
  },
  // {
  //   toJSON: {
  //     transform: (doc, ret, options) => {
  //       delete ret.__v;
  //       return ret;
  //     },
  //   },
  // }
);

const persons = mongoose.model("Persons", personsSchema);
module.exports = persons;
