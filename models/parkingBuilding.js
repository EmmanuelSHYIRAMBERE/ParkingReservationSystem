import mongoose from "mongoose";

const buildingSchema = mongoose.Schema({
  buildingName: {
    type: String,
    required: true,
  },
  District: {
    type: String,
    required: true,
  },
  Sector: {
    type: String,
    required: true,
  },
  Street: {
    type: String,
    required: true,
  },
  Longitude: {
    type: String,
    required: true,
  },
  Latitude: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  managerEmail: {
    type: String,
    required: true,
  },
  managerPassword: {
    type: String,
    required: false,
  },
});

export const Building = mongoose.model("Building", buildingSchema);
