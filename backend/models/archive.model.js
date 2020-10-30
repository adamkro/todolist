const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const archiveSchema = new Schema(
  {
    username: { type: String, required: true },
    todolist: { type: String, required: true },
    text: { type: String },
    done: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Archive = mongoose.model("Archive", archiveSchema);

module.exports = Archive;
