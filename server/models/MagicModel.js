import mongoose from "mongoose";

const MagicSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

const MagicModel = mongoose.model("magic", MagicSchema);

export default MagicModel;
