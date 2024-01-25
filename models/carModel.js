import mongoose from "mongoose";

const carSchema = mongoose.Schema({
  carModel: {
    type: String,
    required: true,
  },
  platNumber: {
    type: String,
    required: true,
  },
  ownerID: {
    type: String,
    required: false,
  },
});

export const Cars = mongoose.model("Cars", carSchema);
