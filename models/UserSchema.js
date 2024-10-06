const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        emailId: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false // Default value
        },
        contactNumber: {
            type: String,
            required: true,
            unique: true
        },
        eventsRegistered: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "EventSchema"
        }],
        certificates:[]
    },
    { timestamps: true } // Automatically create createdAt and updatedAt fields
);

module.exports = mongoose.model("UserSchema", UserSchema);
