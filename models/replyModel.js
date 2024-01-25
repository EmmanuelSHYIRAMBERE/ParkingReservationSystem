import mongoose from "mongoose";

const replyContactSchema = mongoose.Schema({
  contactID: {
    type: String,
    required: true,
  },
  replyEmail: {
    type: String,
    required: true,
  },
  replyMessage: {
    type: String,
    required: true,
  },
  dateSent: {
    type: Date,
    default: Date.now,
  },
});

export const replyContact = mongoose.model("replyContact", replyContactSchema);
