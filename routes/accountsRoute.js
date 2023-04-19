const express = require("express");
const router = express.Router();
const accountsController = require("../controllers/accountsController");

// =-=-=-=-=-=-=-=-=-=-=-=-=- Routes for Accounts -=-=-=-=-=-=-=-=-=-=-=-=-= //
router.get("/login", (req, res) => res.render("login")); // render login page

router.post("/api/accounts", accountsController.createAccount); // create an account
router.get("/api/accounts", accountsController.getAccounts); // get all accounts
router.post("/api/accounts/login", accountsController.login); // login
router.get("/api/accounts/orders", accountsController.getOrders); // get all orders")

module.exports = router;
