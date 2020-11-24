/**
 * This file contains all of the routes for user authentication.
 */
// import modules
const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

// path is actually 'auth/register' because this is called by the 'auth' get function in app.js
router.post("/register", authController.register);
router.post("/login", authController.login);


// export the router for other files to use
module.exports = router;