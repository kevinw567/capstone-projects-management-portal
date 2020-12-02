/**
 * This file contains all of the routes for user authentication.
 */
// import modules
const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);


// export the router for other files to use
module.exports = router;