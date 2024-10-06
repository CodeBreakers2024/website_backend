const mongoose = require("mongoose");
const EntrySchema = new mongoose.Schema(
  {
    eventName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventSchema",
    },
    teamName: {
      type: String,
      required: true,
    },
    leader: {
      name: {
        type: String,
        required: true,
      },
      emailId: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Basic email validation
      },
      contactNumber: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/, // Example regex
      },
    },
    members: [
      {
        name: {
          type: String,
          required: true,
        },
        emailId: {
          type: String,
          required: true,
          match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Basic email validation
        },
        contactNumber: {
          type: String,
          required: true,
          match: /^[0-9]{10}$/, // Example regex
        },
      },
    ],
    submissionDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EntrySchema", EntrySchema);
