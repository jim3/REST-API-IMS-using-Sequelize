const express = require("express");
const router = express.Router();
const partsController = require("../controllers/partsController");

// Render index
router.get("/", (req, res) => res.render("index"));

// Routes
router.get("/api/parts", partsController.getParts); // get all parts
router.get("/api/parts/:id", partsController.getPart); // get a single part
router.post("/api/parts", partsController.createPart); // create a part

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

router.put("/api/parts/:id", async (req, res) => {

});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

router.delete("/api/parts/:id", async (req, res) => {

});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

router.post("/api/accounts", async (req, res) => {
    try {
        const { email, password } = req.body;
        const responseObj = {
            email,
            password,
        };
        await accountsDB.Accounts.create(responseObj);
        res.json(responseObj);

        // handle error
    } catch (err) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

router.get("/api/accounts", async (req, res) => {
    try {
        const accounts = await accountsDB.Accounts.findAll();
        res.json(accounts);

        // handle error
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
