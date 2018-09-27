const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listModel = new Schema(
  {
    moviesId: [{ type: Number, required: true }],
    posterUri: [{ type: String,  required: true }],
    original_language : [{type : String, requied : true}],
    createdBy: {type: Schema.Types.ObjectId , ref : "users" },
    name: { type: String, requied: true },
    like: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model("lists", listModel);
