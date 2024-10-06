const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema"); // Adjust the path as necessary
const mongoose = require("mongoose");
// Create User
router.post("/create-user", async (req, res) => {
    try {
        const { name, emailId, password, contactNumber, isAdmin } = req.body;

        // Create a new user instance
        const newUser = new User({
            name,
            emailId,
            password, // Remember to hash this in a real application
            contactNumber,
            isAdmin,
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error creating user", error: error.message });
    }
});

// Get User by Email
router.post("/get-user", async (req, res) => {
    try {
        const { emailId } = req.body;

        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password, __v, ...userData } = user.toObject();
        res.status(200).json({ message: "User retrieved successfully", user: userData });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error retrieving user", error: error.message });
    }
});

// Update User
router.put("/update-user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error updating user", error: error.message });
    }
});

// Delete User
router.delete("/delete-user/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error deleting user", error: error.message });
    }
});

// Get All Users
router.get("/get-all-users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error retrieving users", error: error.message });
    }
});

// Add Entry
router.post("/add-entry", async (req, res) => {
    try {
        const { eventName, teamName, leader, members } = req.body;
        const newEntry = new Entry({
            eventName,
            teamName,
            leader,
            members,
        });

        await newEntry.save();
        res.status(201).json({ message: "Entry added successfully", entry: newEntry });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error adding entry", error: error.message });
    }
});

module.exports = router;
