const accountsDB = require("../models/Accounts");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

const jwtTokenGenerator = (email) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return token;
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

const createAccount = async (req, res) => {
    try {
        const { email, password } = req.body;

        // define schema for validation
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
        });

        // validate the req.body *against* the defined schema
        const { error } = schema.validate(req.body);

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

        // error handling
        if (!account) {
            return res.status(404).send("Account not found");
        }

        // verify password with bcrypt
        const passwd = await bcrypt.compare(password, account.password);

        // checks if password is valid
        if (passwd) {
            // takes email value from `req` & provides a token as the `res` to client
            const token = jwtTokenGenerator(account.email); // -->

            // add token to header response and send to client
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

const protected = (req, res) => {
    try {
        res.send("You are logged in");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

module.exports = {
    createAccount,
    getAccounts,
    login,
    protected,
};
