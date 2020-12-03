/**
 * This file contains the route for selecting project preferences
 */
// import modules
const express = require("express");
const projectController = require("../controllers/projects");

const router = express.Router();

/**
 * GET the view projects page
 */
router.get("/view", (req, res) => {
    projectController.getProjects(req, res);
})

/**
 * POST the project preferences
 */
router.post("/submitprefs", projectController.submitprefs);

// export the router for other files to use
module.exports = router;