const sequelize = require("../db");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

const Accounts = sequelize.define("Accounts", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validator: {
            isEmail: true,
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validator: {
            is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        },
    },
});

// Hash password *before* saving to db
Accounts.beforeCreate(async (account, options) => {
    const hashedPassword = await bcrypt.hash(account.password, 10);
    account.password = hashedPassword;
});

// Export the model and sequelize connection
const accountsDB = { Accounts, sequelize, Sequelize };
module.exports = accountsDB;
