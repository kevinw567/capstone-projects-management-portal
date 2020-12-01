/**
 * This file contains the functions that will retrieve the user's course information from the database.
 */
const { profile_email } = require("./auth");
const mysql = require("mysql");
const e = require("express");

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
        console.log(course_id);
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

// exports.getEnrolledCourses = (req, res) => {
//     console.log("Getting enrolled courses");
//     console.log(profile_email);
//     db.query("SELECT id FROM users WHERE email = ?", ["student@email"], (error, results) => {
//         if (error) {
//             console.log(error);
//             res.render("addcourse", {
//                 message: "Could not register for course"
//             })
//         }

//         student_id = results[0].id;
//         console.log("student id: " + results[0].id);
//     })
//     db.query("SELECT course_number, course_description, professor FROM courses JOIN courses_info WHERE courses_info.student_id = ?", [student_id], (error, result) => {
//         if (error) {
//             console.log(error);
//         }
//         console.log("reprint student_id: " + student_id);
//         console.log(result);
//     })
// }

exports.createcourse = (req, res) => {
    const { coursenumber, description } = req.body;
    // generate a random code for the course
    course_id = Math.random().toString(36).substring(2, 10);
    let email = req.session.email;
    db.query("SELECT username FROM users WHERE email=?", [email], (error, result)=>{
        if (error) {
            res.render("createcourse", {
                message: "An error occured!"
            })
        } else {
            db.query("INSERT INTO courses SET ?", { id:course_id, course_number:coursenumber, course_description:description, professor: result[0]['username']}, (error, result) => {
                if(error) {
                    res.render('createcourse', {
                        message: "An error occured. Please try again!"
                    })
                } else {
                    res.render('createcourse', {
                        message: "Course created!"
                    })}
                })}
            })};
            
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