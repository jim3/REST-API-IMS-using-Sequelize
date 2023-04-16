const express = require("express");
const router = express.Router();
const Parts = require("../models/Parts");
const Accounts = require("../models/Accounts");

// =-=-=-=-=-=-=-=-=-=-=-=-=- PARTS -=-=-=-=-=-=-=-=-=-=-=-=-= //

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

const getPart = async (req, res) => {
    try {
        const part = await db.Parts.findByPk(req.params.id);
        res.json(part);

        // handle error
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const createPart = async (req, res) => {
    try {
        const { partname, quantity, price, ...product } = req.body;
        const productType = Object.keys(product)[0];
        const productValue = product[productType];

        const responseObj = {
            partName: partname,
            partType: productValue,
            quantity,
            price,
        };
        await db.Parts.create(responseObj);
        res.render("index", {
            ...responseObj,
        });

        // handle error
    } catch (err) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
};

const updatePart = async (req, res) => {
    try {
        const { partname, quantity, price, ...product } = req.body;
        const productType = Object.keys(product)[0];
        const productValue = product[productType];

        const responseObj = {
            partName: partname,
            partType: productValue,
            quantity,
            price,
        };
        const part = await db.Parts.findByPk(req.params.id); // get part to update

        // update the part
        await part.update(responseObj);
        res.json(responseObj);

        // handle error
    } catch (err) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
};

const deletePart = async (req, res) => {
    try {
        const { partname, quantity, price, ...product } = req.body;
        const productType = Object.keys(product)[0];
        const productValue = product[productType];
        const responseObj = {
            partName: partname,
            partType: productValue,
            quantity,
            price,
        };
        const part = await db.Parts.findByPk(req.params.id);
        await part.destroy(responseObj);
        res.json(responseObj);

        // handle error
    } catch (err) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
};

// =-=-=-=-=-=-=-=-=-=-=-=-=- ACCOUNTS -=-=-=-=-=-=-=-=-=-=-=-=-= //


module.exports = router;

