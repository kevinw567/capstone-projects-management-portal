/**
 * This file holds the function calls that will get the course/project information
 * for the courses and projects pages.
 */
const express = require("express");
const courseController = require("../controllers/courses");
const projectController = require("../controllers/projects");

const router = express.Router();

router.get('/addcourse/:userID', (req, res) => {
    res.render("addcourse", {
        userID: req.params.userID
    });
})
/**
 * POST the course the user wants to register for
 */
router.get("/professor", (req, res) => {
    res.render("professor");
})
router.get("/student", (req, res) => {
    res.render("student");
})
router.get("/createcourse", (req, res) => {res.render("createcourse")});
router.post("/createcourse", courseController.createcourse);
router.get("/enrolled", courseController.getEnrolledCourses);
router.get("/addcourse", (req, res) => {
    res.render("addcourse");
})
router.post("/addcourse", courseController.addcourse);

router.get("/setting", (req, res) => {res.render("setting")});
router.post("/setting", courseController.setting);

router.get("/addproject", (req, res) => {res.render("addproject")});
router.post("/addproject", projectController.addproject);

// export the router for other files to use
module.exports = router;