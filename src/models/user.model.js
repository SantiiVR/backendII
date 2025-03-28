import mongoose, { Schema } from "mongoose";

const collection= new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    loggedBy: String,
    role: {
        type: String,
        enum: [`admin`, `user`],
        default: `user`
    }
})

const userModel = mongoose.model(collection, Schema)

export default userModel