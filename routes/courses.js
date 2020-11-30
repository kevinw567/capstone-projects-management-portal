/**
 * This file holds the function calls that will get the course/project information
 * for the courses and projects pages.
 */
const express = require("express");
const courseController = require("../controllers/courses");

const router = express.Router();

router.post("/addcourse", courseController.addcourse);
//router.post("/courses", courseController.getCourses);


// export the router for other files to use
module.exports = router;