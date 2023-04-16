const express = require("express");
const router = express.Router();
const Parts = require("../models/Parts");
const Accounts = require("../models/Accounts");

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

const getParts = async (req, res) => {
    try {
        const parts = await db.Parts.findAll();
        res.json(parts);

        // handle error
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = router;
