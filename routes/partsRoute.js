const express = require("express");
const router = express.Router();
const db = require("../models/Parts");
const accountsDB = require("../models/Accounts");

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// PART ROUTES
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

router.get("/", (req, res) => {
    res.render("index");
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

// get all parts
router.get("/api/parts", async (req, res) => {
    try {
        const parts = await db.Parts.findAll();
        res.json(parts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

// get part by id
router.get("/api/parts/:id", async (req, res) => {
    try {
        const part = await db.Parts.findByPk(req.params.id);
        res.json(part);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

// create new part
router.post("/api/parts", async (req, res) => {
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

        // (*) wait for the operation to complete before rendering the template
        await db.Parts.create(responseObj);

        res.render("index", {
            ...responseObj,
        });
    } catch (err) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

// update part
router.put("/api/parts/:id", async (req, res) => {
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

        // get part to update
        const part = await db.Parts.findByPk(req.params.id);

        // update the part
        await part.update(responseObj);

        res.json(responseObj);
    } catch (err) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

// delete part
router.delete("/api/parts/:id", async (req, res) => {
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

        // (*) wait for update
        const part = await db.Parts.findByPk(req.params.id);

        // delete part
        await part.destroy(responseObj);
        res.json(responseObj);
    } catch (err) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// ACCOUNT ROUTES
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

// create a new account
router.post("/api/accounts", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("--------> ", email, password);
        const responseObj = {
            email,
            password,
        };

        // (*) await the operation before responding
        await accountsDB.Accounts.create(responseObj);

        res.json(responseObj);
    } catch (err) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
});

// get all accounts
router.get("/api/accounts", async (req, res) => {
    try {
        const accounts = await accountsDB.Accounts.findAll();
        res.json(accounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

module.exports = router;

// http://localhost:3000/api/accounts 0.
