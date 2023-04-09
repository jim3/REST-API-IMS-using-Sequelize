const sequelize = require("../db");
const { Sequelize } = require("sequelize");

const Parts = sequelize.define("Parts", {
    partName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    partType: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

const db = { Parts, sequelize, Sequelize };
module.exports = db;
