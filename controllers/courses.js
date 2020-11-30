/**
 * This file contains the functions that will retrieve the user's course information from the database.
 */
const { profile_email } = require("./auth");
const mysql = require("mysql");

const db = mysql.createConnection({
    // host IP address
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    // database name
    database: process.env.DATABASE
})

exports.addcourse = (req, res) => {
    let course_id = 0;
    courseCode = req.body.course_code;
    // query the database for the course number to enroll in
    db.query("SELECT id FROM courses WHERE course_number = ?", [courseCode], (error, result) => {
        if (error) {
            console.log(error);
        }

        course_id = result[0].id;
        // insert the course id and student id into the course info table
        db.query("INSERT INTO courses_info SET ?", {student_id: req.params.userID, id: course_id }, (error, results) => {
            if (error) {
                console.log(error);
                if (error.code === "ER_DUP_ENTRY") {
                    res.render("addcourse", {
                        message: "You are already enrolled in this course",
                        userID: req.params.userID
                    })
                }

                else {
                    res.render("addcourse", {
                        message: "An unexpected error occured",
                        userID: req.params.userID
                    })
                }
            }

            else {
                res.render("addcourse", {
                    message: "Sucessfully Enrolled in Course",
                    userID: req.params.userID
                })
            }
        })
    })
}

exports.getEnrolledCourses = (req, res) => {
    
    // query the database for all of the courses the user is enrolled in
    db.query("SELECT course_number, course_description, professor FROM courses_info JOIN courses WHERE courses.id = courses_info.id AND courses_info.student_id = ?", [req.userID], (error, results) => {
        if (error) {
            console.log(error);
            res.render("courses", {
                userID: req.userID,
                message: "An unexpected error occured"
            })
        }

        // enter if statement if the user is not enrolled in any courses
        else if (results.length <= 0) {
            res.render("courses", {
                userID: req.userID,
                message: "You are not enrolled in any classes",
            })
        }

        // 
        else {
            req.results = results;
            console.log("req.results: " + req.results);
            console.log(results);
            res.render("courses", {
                userID: req.userID,
                results: results
            })
        }
    })
}