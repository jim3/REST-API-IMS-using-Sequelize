const express = require("express");
const router = express.Router();

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

router.get("/", (req, res) => res.render("index")); // render index page

router.get("/api/parts", async (req, res) => {
    try {
        const parts = await db.Parts.findAll();
        res.json(parts);

        // handle error
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

router.get("/api/parts/:id", async (req, res) => {
    try {
        const part = await db.Parts.findByPk(req.params.id);
        res.json(part);

        // handle error
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

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
        await db.Parts.create(responseObj);
        res.render("index", {
            ...responseObj,
        });

        // handle error
    } catch (err) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

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
        const part = await db.Parts.findByPk(req.params.id); // get part to update

        // update the part
        await part.update(responseObj);
        res.json(responseObj);

        // handle error
    } catch (err) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

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
        const part = await db.Parts.findByPk(req.params.id);
        await part.destroy(responseObj);
        res.json(responseObj);

        // handle error
    } catch (err) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
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
