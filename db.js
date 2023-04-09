const Sequelize = require("sequelize");

// create the database connection
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "parts.db",
  logging: (...msg) => console.log(msg),
  define: {
    freezeTableName: true,
  },
});

// test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
testConnection();

module.exports = sequelize;
