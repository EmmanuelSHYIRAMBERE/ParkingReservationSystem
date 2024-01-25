import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullNames: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  phoneNo: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: "active",
  },
  role: {
    type: String,
    default: "user",
  },
  buildingManaged: {
    type: String,
    default: null,
  },
  buildingAddress: {
    type: String,
    default: null,
  },
  otp: {
    type: String,
    required: false,
  },
  otpExpiry: {
    type: Date,
  },
  passwordChangedAt: Date,
});

export const User = mongoose.model("User", userSchema);
