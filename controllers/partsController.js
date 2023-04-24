const db = require("../models/Parts");

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

const getParts = async (req, res) => {
    try {
        const parts = await db.Parts.findAll();
        res.json(parts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

const getPart = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ error: "Please include all required fields" });
        }
        // find by primary key
        const part = await db.Parts.findByPk(req.params.id);
        res.json(part);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

const createPart = async (req, res) => {
    try {
        if (
            !req.body.partname ||
            !req.body.quantity ||
            !req.body.price ||
            !req.body.product
        ) {
            return res.status(400).json({ error: "Please include all required fields" });
        }
        // destructure req.body object
        const { partname, quantity, price, ...product } = req.body;
        const productType = Object.keys(product)[0];
        const productValue = product[productType];
        const responseObj = {
            partName: partname,
            partType: productValue,
            quantity,
            price,
        };
        // combines the `build` and `save` methods
        await db.Parts.create(responseObj);
        res.render("index", {
            ...responseObj,
        });
    } catch (err) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

const updatePart = async (req, res) => {
    try {
        if (
            !req.body.partname ||
            !req.body.quantity ||
            !req.body.price ||
            !req.body.product
        ) {
            return res.status(400).json({ error: "Please include all required fields" });
        }

        // destructure req.body object
        const { partname, quantity, price, ...product } = req.body;
        const productType = Object.keys(product)[0];
        const productValue = product[productType];

        const responseObj = {
            partName: partname,
            partType: productValue,
            quantity,
            price,
        };
        // find by primary key
        const part = await db.Parts.findByPk(req.params.id);
        await part.update(responseObj);
        res.json(responseObj);
    } catch (err) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

const deletePart = async (req, res) => {
    try {
        if (
            !req.body.partname ||
            !req.body.quantity ||
            !req.body.price ||
            !req.body.product
        ) {
            return res.status(400).json({ error: "Please include all required fields" });
        }

        // destructure req.body object
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
    } catch (err) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getParts,
    getPart,
    createPart,
    updatePart,
    deletePart,
};
