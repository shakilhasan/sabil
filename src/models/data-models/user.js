const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true,},
    email: {type: String, required: true, trim: true, lowercase: true,},
    mobile: {type: String, required: false,},
    password: {type: String, required: true,},
    avatar: {type: String, required: false},
    role: {type: String, enum: ["admin", "user"], default: "user"},

    createdAt: {type: String, required: false},
    updatedAt: {type: String, required: false}
});

//reference model
const User = new mongoose.model("User", userSchema);

User.createNew = async (user) => {
    user._id = new mongoose.Types.ObjectId();
    const model = new User(user);
    return model;
}
module.exports = User;
