import mongoose from "mongoose";

const blackSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

const BlackListModel = mongoose.model("blacklist", blackSchema);

export default BlackListModel;
