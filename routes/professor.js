/**
 * This file contains the route for selecting project preferences
 */
// import modules
const express = require("express");
const projectController = require("../controllers/projects");
const courseController = require("../controllers/courses");

const router = express.Router();

/**
 * GET the view projects page
 */
// router.get("/projects", (req, res) => {
//     projectController.getProjects(req, res);
// })

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
router.get("/admin-view-projects", projectController.viewprojects);
router.post("/view-project", projectController.viewsingleproject);
router.get("/admin-settings", courseController.setting);
router.post('/admin-settings', courseController.updateSetting);
router.get("/deleteproject", projectController.deleteproject);

// export the router for other files to use
module.exports = router;