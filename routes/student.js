/**
 * This file holds the function calls that will get the course/project information
 * for the courses and projects pages.
 */
const express = require("express");
const courseController = require("../controllers/courses");
const projectController = require("../controllers/projects");

const router = express.Router();

router.get("/main", (req, res) => {
    res.render("student/student");
})

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