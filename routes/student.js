/**
 * This file holds the function calls that will get the course/project information
 * for the courses and projects pages.
 */
const express = require("express");
const courseController = require("../controllers/courses");
const projectController = require("../controllers/projects");

const router = express.Router();

// router.get('/addcourse/:userID', (req, res) => {
//     res.render("addcourse", {
//         userID: req.params.userID
//     });
// })
/**
 * POST the course the user wants to register for
 */
// router.get("/professor", (req, res) => {
//     res.render("professor/professor");
// })

// router.get("/createcourse/:userID", (req, res) => {
//     console.log("GET /createcourse/" + req.params.userID);
//     res.render("/createcourse", {
//         userID: req.params.userID
//     })
// })

router.get("/main", (req, res) => {
    res.render("student/student");
})
// router.get("/createcourse", (req, res) => {res.render("professor/createcourse")});
// router.post("/createcourse", courseController.createcourse);
router.get("/enrolled", courseController.getEnrolledCourses);
router.get("/addcourse", (req, res) => {
    res.render("student/addcourse");
})
router.post("/addcourse", courseController.addcourse);

router.get("/setting", courseController.setting);
router.post("/setting", courseController.updateSetting);

router.get("/courses", (req, res) => {res.render("student/courses")});

router.get("/projects", projectController.getProjects);
router.post("/view-project", projectController.viewsingleproject);

router.get("/student-project", projectController.getStudentProjects);
router.post("/select-project", projectController.select_project);
router.post("/submitprefs", projectController.submitprefs);


// export the router for other files to use
module.exports = router;