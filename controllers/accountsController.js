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
        // - - - - - -
        const account = await accountsDB.Accounts.findOne({
            where: {
                email: {
                    [Op.eq]: email,
                },
            },
        });

        if (!account) {
            return res.status(404).send("Account not found");
        }

        const passwd = await bcrypt.compare(password, account.password);
        // jwt
        if (passwd) {
            // generate signed jwt token
            const token = jwtTokenGenerator(account.email);
            // add token to header response and send
            res.header("Authorization", `Bearer ${token}`).send({ message: "Success" });

            // TODO create a `verifyToken` middleware function to check if token is valid
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
