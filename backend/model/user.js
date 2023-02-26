const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
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
    },
    blogs:[{type: mongoose.Types.ObjectId,ref:"Blog", required: true}],
});

const user = mongoose.model("User", userSchema);
module.exports = user
// it will be stored by the name "users" in the mongodb database