import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  user: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  actionMade: {
    type: String,
    required: false,
  },
  buildingId: {
    type: String,
    required: false,
  },
  dateSent: {
    type: Date,
    default: Date.now,
  },
});

export const Notification = mongoose.model("Notification", notificationSchema);
