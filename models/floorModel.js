import mongoose from "mongoose";

const floorSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: false,
  },
  buildingId: {
    type: String,
    required: true,
  },
  totalSlots: {
    type: Number,
    default: 0,
  },
  remainingSlots: {
    type: Number,
    default: 0,
  },
  bookedSlots: {
    type: Number,
    default: 0,
  },
});

export const Floors = mongoose.model("Floors", floorSchema);
