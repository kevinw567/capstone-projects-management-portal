/**
 * This file contains the route for selecting project preferences
 */
// import modules
const express = require("express");
const projectController = require("../controllers/projects");
const courseController = require("../controllers/courses");

const router = express.Router();

/**
 * POST the project preferences
 */
router.post("/submitprefs", projectController.submitprefs);


router.get("/main", (req, res) => {
    res.render("professor/professor");
})
router.get("/createcourse", (req, res) => {res.render("professor/createcourse")});
router.post("/createcourse", courseController.createcourse);

router.get("/admin-setting", (req, res) => {res.render("professor/admin-setting")});

router.get("/addproject", (req, res) => {res.render("professor/addproject")});
router.post("/addproject", projectController.addproject);
router.get("/admin-view-courses", courseController.viewcourses);
router.post("/admin-view-courses", courseController.deletecourses);
router.get("/admin-view-projects", projectController.viewprojects);
router.post('/admin-view-projects', projectController.deleteproject);
router.post("/view-project", projectController.viewsingleproject);
router.post("/update", projectController.updateProject);
router.get("/admin-settings", courseController.setting);
router.post('/admin-settings', courseController.updateSetting);

router.get("/select-course", courseController.getcourses);
router.get("/select-course", (req, res) => {res.render("professor/select-course")});
router.post("/select-course", courseController.selectcourse);
// router.get("/select-course", projectController.assignProjects);

// export the router for other files to use
module.exports = router;