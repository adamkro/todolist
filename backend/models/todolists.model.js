const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todolistsSchema = new Schema(
  {
    username: { type: String, required: true },
    lists: { type: Array },
  },
  {
    timestamps: true,
  }
);

const ToDoLists = mongoose.model("ToDoLists", todolistsSchema);

module.exports = ToDoLists;
