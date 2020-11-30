/**
 * This file contains all of the routes for user authentication.
 */
// import modules
const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

// added commented out, function to query database for user id before post function
// const mysql = require("mysql");

// const db = mysql.createConnection({
//     // host IP address
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     // database name
//     database: process.env.DATABASE
// })

// // path is actually 'auth/register' because this is called by the 'auth' get function in app.js
// router.get("/auth/login/:userID", (req, res, next) => {
//     db.query("SELECT ")
// })
router.post("/register", authController.register);
router.post("/login", authController.login);


// export the router for other files to use
module.exports = router;