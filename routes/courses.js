/**
 * This file holds the function calls that will get the course/project information
 * for the courses and projects pages.
 */
const express = require("express");
const courseController = require("../controllers/courses");

const router = express.Router();

router.get('/addcourse/:userID', (req, res) => {
    res.render("addcourse", {
        userID: req.params.userID
    });
})
/**
 * POST the course the user wants to register for
 */
router.post("/addcourse/:userID", courseController.addcourse);

/**
 * GET the user's enrolled courses by calling getEnrolledCourses() in controllers/courses.js
 */
router.get("/enrolled/:userID", (req, res) => {
    console.log("GET /enrolled/" + req.params.userID);
    req.userID = req.params.userID;
    console.log("req.userID = " + req.userID)
    courseController.getEnrolledCourses(req, res);
})

router.get("/createcourse/:userID", (req, res) => {
    console.log("GET /createcourse/" + req.params.userID);
    res.render("/createcourse", {
        userID: req.params.userID
    })
})

// export the router for other files to use
module.exports = router;