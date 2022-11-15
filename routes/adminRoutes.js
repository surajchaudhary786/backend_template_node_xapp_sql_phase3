const express = require("express");
const adminController = require("./../controllers/adminController");
const router = express.Router();

// All Routes of user
//These are handeled in controllers


router.get("/", adminController.view);
router.get("/sign_up", adminController.form);
router.post("/sign_up", adminController.post);

module.exports = router;