const express = require("express");
const router = express.Router();
const accountsController = require("../controllers/accountsController");
const verifyToken = require("../middlewares/verifyToken");

// router.get("/login", (req, res) => res.render("login")); // render login page
router.post("/api/accounts", accountsController.createAccount); // create an account
router.get("/api/accounts", accountsController.getAccounts); // get all accounts
router.post("/api/accounts/login", verifyToken, accountsController.login); // login

module.exports = router;
