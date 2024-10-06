const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Event = require("../models/EventSchema"); // Adjust the path as necessary
const Certificate = require("../models/CertificateSchema"); // Adjust the path as necessary
const Entry = require("../models/EntrySchema"); // Adjust the path as necessary
const mongoose = require("mongoose");
const { formatEventDateRange } = require("../functions/DateRangeConverted");

// Set up storage for the uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public'); // Store images in the /public folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Append extension
    }
});

// Initialize multer
const upload = multer({ storage: storage });

// Get All Active Events
router.get("/get-events", async (req, res) => {
    try {
        const events = await Event.find(); // Fetch only active events
        // Modify the events to include the image URL instead of just the imageSrc
        const updatedEvents = events.map(event => ({
            ...event._doc, // Spread the existing event fields
            image: event.imageSrc ? `${req.protocol}://${req.get('host')}${event.imageSrc}` : null, // Construct the full URL for the image
            dates: formatEventDateRange(event.startDate,event.endDate)
        }));

        res.status(200).json({ message: "Active events retrieved successfully", events: updatedEvents });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error retrieving events", error: error.message });
    }
});


// Add Event with Image
router.post("/add-event", upload.single('image'), async (req, res) => {
    try {
        const { eventName, description, startDate, endDate, location, teamSize, eventType, isActive } = req.body;

        const newEvent = new Event({
            eventName,
            description,
            startDate,
            endDate,
            location,
            teamSize,
            eventType,
            isActive: isActive !== undefined ? isActive : true, // Default isActive to true if not provided
            imageSrc: req.file ? `/${req.file.filename}` : null, // Set image source
        });

        await newEvent.save();
        res.status(201).json({ message: "Event added successfully", event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error adding event", error: error.message });
    }
});

// Remove (or Deactivate) Event
router.post("/end-event", async (req, res) => {
    try {
        const { id } = req.body;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        event.isActive = false; // Instead of deleting, we mark it as inactive
        await event.save();

        res.status(200).json({ message: "Event deactivated successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error deactivating event", error: error.message });
    }
});

// Reactivate Event
router.post("/activate-event", async (req, res) => {
    try {
        const { id } = req.body;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        event.isActive = true; // Reactivate the event
        await event.save();

        res.status(200).json({ message: "Event reactivated successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error reactivating event", error: error.message });
    }
});

// Permanently Remove Event (Optional)
router.post("/delete-event", async (req, res) => {
    try {
        const { id } = req.body;

        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({ message: "Event removed permanently" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error removing event", error: error.message });
    }
});

module.exports = router;
