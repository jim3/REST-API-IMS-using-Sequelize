const express = require("express");
const router = express.Router();
const partsController = require("../controllers/partsController");

// render index.ejs
router.get("/", (req, res) => res.render("index"));

// =-=-=-=-=-=-=-=-=-=-=-=-=- Routes->Controllers -=-=-=-=-=-=-=-=-=-=-=-=-= //

router.get("/api/parts", partsController.getParts); // get all parts
router.get("/api/parts/:id", partsController.getPart); // get a single part
router.post("/api/parts", partsController.createPart); // create a part
router.put("/api/parts/:id", partsController.updatePart); // update a part
router.delete("/api/parts/:id", partsController.deletePart); // delete a part
router.post("/api/accounts", partsController.createAccount); // create an account
router.get("/api/accounts", partsController.getAccounts); // get all accounts

module.exports = router;
