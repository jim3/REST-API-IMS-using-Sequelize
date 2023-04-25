const express = require("express");
const router = express.Router();
const accountsController = require("../controllers/accountsController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/api/accounts", accountsController.createAccount); // create an account
router.get("/api/accounts", accountsController.getAccounts); // get all accounts
router.post("/api/accounts/login", accountsController.login); // login
router.get("/api/accounts/protected", verifyToken, accountsController.protected);

module.exports = router;
