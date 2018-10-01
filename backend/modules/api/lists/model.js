const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeModel = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: { createdAt: "createdAt" } }
);

const commentModel = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
    content: {type: String, required: true}
  },
  { timestamps: { createdAt: "createdAt" } }
);

const listModel = new Schema(
  {
    moviesId: [{ type: Number, required: true }],
    posterUri: [{ type: String, required: true }],
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
    name: { type: String, requied: true },
    like: { type: [likeModel] , default : []},
    view: { type: Number, default: 0 },
    comments: {type: [commentModel] , default: []}
  },
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model("lists", listModel);
