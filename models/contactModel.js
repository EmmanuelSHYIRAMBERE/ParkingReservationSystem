import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  fullNames: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  dateSent: {
    type: Date,
    default: Date.now,
  },
});

export const Contact = mongoose.model("Contact", contactSchema);
