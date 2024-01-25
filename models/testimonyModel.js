import mongoose from "mongoose";

const testimonySchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
});

export const Testimony = mongoose.model("Testimony", testimonySchema)