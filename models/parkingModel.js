import mongoose from "mongoose";

const parkingSchema = mongoose.Schema({
  Slot: {
    type: String,
    required: false,
  },
  Price: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: "available",
  },
  floorID: {
    type: String,
    required: false,
  },
  buildingId: {
    type: String,
    required: false,
  },
});

export const Parkings = mongoose.model("Parkings", parkingSchema);
