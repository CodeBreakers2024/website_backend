const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    teamSize:{
        type: Number,
        required: true,
    },
    endDate: {
        type: Date,
    },
    isActive:{
        type: Boolean,
        required: true,
        default: true,
    },
    imageSrc: {
        type: String, // URL/path to the image
    },
});

module.exports = mongoose.model("Event", EventSchema);
