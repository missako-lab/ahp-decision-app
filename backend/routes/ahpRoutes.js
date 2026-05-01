const express = require("express");
const router = express.Router();
const { computeAHP } = require("../controllers/ahpController");

router.post("/compute", computeAHP);

module.exports = router;