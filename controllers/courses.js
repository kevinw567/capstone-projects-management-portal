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
    console.log(req.body);
    courseCode = req.body.course_code;
    let student_id0= 0;
    let course_id = 0;
    console.log(req.session);
    res.render("addcourse");
    // check if the course exist
    // db.query(`SELECT * FROM courses WHERE id = ${courseCode}`, (error, results) => {
    //     if (error) {
    //         res.render("addcourse", {
    //             message: "The course does not exist"
    //         })
    //     } else {
    //         db.query(`SELECT id FROM users WHERE email = ${profile_email}`, (error, results) => {
    //             if (error) {
    //                 res.render("addcourse", {
    //                     message: "Unable to add course, try again!"
    //                 })
    //             } else {

    //             }
    //         })
    //     }
    // })
    // query the database for the student's id
    // db.query("SELECT id FROM users WHERE email = ?", [profile_email], (error, results) => {
    //     if (error) {
    //         console.log(error);
    //         res.render("addcourse", {
    //             message: "Unable to add course, try again"
    //         })
    //     }
        
    //     let users_row = results[Object.keys(results)[0]];
    //     student_id = users_row.id;

    //         // query the database for the course id to enroll in
    //     db.query("SELECT id FROM courses WHERE course_number = ?", [courseCode], (error, result) => {
    //         if (error) {
    //             console.log(error);
    //         }

    //         let course_row = results[Object.keys(result)[0]];
    //         course_id = course_row.id;
    //         console.log(course_id);

    //         db.query("INSERT INTO courses_info SET ?", {student_id: student_id, id: course_id }, (error) => {
    //             if (error) {
    //                 console.log(error);
    //                 res.render("addcourse", {
    //                     message: "Unable to add course, try again"
    //                 })
    //             }

    //             else {
    //                 res.render("addcourse", {
    //                     message: "Course registered"
    //                 })
    //             }
    //         })
    //     })
    // })
}
    
    

    


