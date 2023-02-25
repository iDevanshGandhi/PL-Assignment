import mongoose from "mongoose";

const Schema = new mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneno: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

export default mongoose.model("User", userSchema);
// it will be stored by the name "users" in the mongodb database