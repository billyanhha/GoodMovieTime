const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listModel = new Schema(
  {
    moviesId: [{ type: Number, required: true }],
    posterUri: [{ type: String,  required: true }],
    original_language : [{type : String, requied : true}],
    name: { type: String, requied: true },
    score: { type: Number, default: 0 },
    vote: { type: Number, default: 0 }
  },
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model("lists", listModel);
