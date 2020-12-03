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

router.get("/setting", (req, res) => {res.render("student/setting")});
router.post("/setting", courseController.setting);
// router.get("/admin-setting", (req, res) => {res.render("professor/admin-setting")});

// router.get("/addproject", (req, res) => {res.render("professor/addproject")});
// router.post("/addproject", projectController.addproject);

router.get("/courses", (req, res) => {res.render("student/courses")});

// router.get("/admin-view-courses", courseController.viewcourses);
// router.get("/admin-view-projects", projectController.viewprojects);
// router.post("/view-project", projectController.viewsingleproject);
router.get("/projects", projectController.getProjects);
router.post("/view-project", projectController.viewsingleproject);

router.get("/student-project", projectController.getStudentProjects);

// export the router for other files to use
module.exports = router;