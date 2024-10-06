const mongoose = require("mongoose");

const CertificateSchema = mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventSchema',
        required: true,
    },
    issueDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value <= new Date(); // Ensure the date is not in the future
            },
            message: 'Issue date cannot be in the future',
        },
    },
    position: {
        type: String,
        required: true,
    },
    recipient: {
        name: {
            type: String,
            required: true,
        },
        emailId: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Basic email validation
        },
    },
}, { timestamps: true });

module.exports = mongoose.model("CertificateSchema", CertificateSchema);
