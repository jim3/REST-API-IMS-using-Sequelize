const accountsDB = require("../models/Accounts");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

const jwtTokenGenerator = (email) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

const createAccount = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password
        const { error } = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string()
                .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
                .required(),
        }).validate(req.body);

        // If validation fails, return 400
        if (error) {
            console.log(error.details[0].message);
            return res.status(400).send(error.details[0].message);
        }

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

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

const getAccounts = async (req, res) => {
    try {
        const accounts = await accountsDB.Accounts.findAll();
        res.json(accounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password
        if (!email || !password) {
            return res.status(400).send("Missing fields");
        }

        // Check if account exists
        const account = await accountsDB.Accounts.findOne({
            where: {
                email: {
                    [Op.eq]: email,
                },
            },
        });

        // If account doesn't exist, return 404
        if (!account) {
            return res.status(404).send("Account not found");
        }

        const passwd = await bcrypt.compare(password, account.password);

        if (passwd) {
            // generate signed jwt token
            const token = jwtTokenGenerator(account.email);

            // add token to header response and send
            res.header("Authorization", `Bearer ${token}`).send({ message: "Success" });
        } else {
            return res.status(401).send("Invalid credentials");
        }
        // - - - - - -
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

const getOrders = async (req, res) => {
    try {
        res.render("orders");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    createAccount,
    getAccounts,
    login,
    getOrders,
};
