const db = require("../models/Parts");
const accountsDB = require("../models/Accounts");
const Joi = require("joi");

// =-=-=-=-=-=-=-=-=-=-=-=-=- PARTS -=-=-=-=-=-=-=-=-=-=-=-=-= //

const getParts = async (req, res) => {
    try {
        const parts = await db.Parts.findAll();
        res.json(parts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const getPart = async (req, res) => {
    try {
        const part = await db.Parts.findByPk(req.params.id);
        res.json(part);
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
        // find by primary key
        const part = await db.Parts.findByPk(req.params.id);

        await part.update(responseObj);
        res.json(responseObj);
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
    } catch (err) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
};

// =-=-=-=-=-=-=-=-=-=-=-=-=- ACCOUNTS -=-=-=-=-=-=-=-=-=-=-=-=-= //

const createAccount = async (req, res) => {
    try {
        const { email, password } = req.body;

        // - - - - - -
        const { error } = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string()
                .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
                .required(),
        }).validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            return res.status(400).send(error.details[0].message);
        }
        // - - - - - -

        const responseObj = {
            email,
            password,
        };

        await accountsDB.Accounts.create(responseObj);
        res.json(responseObj);
    } catch (err) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
};

const getAccounts = async (req, res) => {
    try {
        const accounts = await accountsDB.Accounts.findAll();
        res.json(accounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
    getParts,
    getPart,
    createPart,
    updatePart,
    deletePart,
    createAccount,
    getAccounts,
};
