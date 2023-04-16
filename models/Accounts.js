const sequelize = require("../db");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

const Accounts = sequelize.define("Accounts", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // add validation to ensure email is unique
        validator: {
            isEmail: true, // ensure email is valid
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validator: {
            is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // 8 characters: 1 letter 1 number
        },
    },
});

// Hash password before saving to database
Accounts.beforeCreate(async (account, options) => {
    const hashedPassword = await bcrypt.hash(account.password, 10);
    account.password = hashedPassword;
});

// Export the model and sequelize connection
const accountsDB = { Accounts, sequelize, Sequelize };
module.exports = accountsDB;

// Accounts.beforeCreate(async (account, options) => {.,..};  I am not use to seeing this syntax.  

// const beforeCreate = async (account, options) => {...};