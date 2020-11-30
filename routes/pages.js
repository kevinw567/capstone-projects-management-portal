/**
 * This file contains all of the routes for our website.
 */
// import modules
const express = require("express");
const courseController = require("../controllers/courses")

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/register", (req, res) => {
    res.render("register");
});

// router.get("/login", (req, res) => {
//     res.render("home");
// });

router.get("/projects", (req, res) => {
    res.render("projects");
})

router.get("/addcourse", (req, res) => {
    res.render("addcourse");
});

router.get("/courses", (req, res, next) => {
    courseController.getEnrolledCourses();
    next();
})

router.get("/courses", (req, res) => {
    res.render("courses");
});



// export the router for other files to use
module.exports = router;