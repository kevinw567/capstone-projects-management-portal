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

router.post("/addcourse/:userID", courseController.addcourse);

router.get("/courses", (req, res) => {
    res.render("courses");
})

router.get("/addcourse", (req, res) => {
    res.render("addcourse", {
        message: "Unable to addcourse. Please log out and log back in to try again."
    })
})

// export the router for other files to use
module.exports = router;