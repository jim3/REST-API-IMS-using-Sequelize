const sequelize = require("../db");
const { Sequelize } = require("sequelize");

const Accounts = sequelize.define("Accounts", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

// Export the model and sequelize connection
const accountsDB = { Accounts, sequelize, Sequelize };
module.exports = accountsDB;
