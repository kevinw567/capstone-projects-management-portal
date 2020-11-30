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
                console.log(results)

                res.render("addcourse", {
                    message: "Course registered",
                    userID: req.params.userID
                })
            }
        })
    })
}

exports.getEnrolledCourses = (req, res) => {
    console.log("Getting enrolled courses");
    console.log(profile_email);
    db.query("SELECT id FROM users WHERE email = ?", ["student@email"], (error, results) => {
        if (error) {
            console.log(error);
            res.render("addcourse", {
                message: "Could not register for course"
            })
        }

        student_id = results[0].id;
        console.log("student id: " + results[0].id);
    })
    db.query("SELECT course_number, course_description, professor FROM courses JOIN courses_info WHERE courses_info.student_id = ?", [student_id], (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log("reprint student_id: " + student_id);
        console.log(result);
    })
}