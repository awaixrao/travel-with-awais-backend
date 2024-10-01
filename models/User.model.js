const mongoose = require("mongoose");

// creating schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "dummy.jpg",
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        default: "customer",
        enum: ['admin', 'customer', 'employee']
    }
}, {timestamps: true});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;