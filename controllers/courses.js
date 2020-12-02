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
    const course_code = req.body.coursecode;
    db.query("SELECT * FROM courses WHERE id=?", [course_code], (error, result) => {
        if(error) {
            res.render('addcourse', {
                message: "An error occured, Please try again!"
            })
        } else if (result.length == 0) {
            res.render('addcourse', {
                message: "No course found with the course code!"
            })
        } else {
            db.query("SELECT * FROM courses_info WHERE student_id = ? AND id = ?", [req.session.userid, course_code], (error, result) => {
                // console.log(req.session.userid);
                // console.log(result);
                if (error) {
                    res.render('addcourse', {
                        message: "An error occured, Please try again!"
                    })
                } else if(result.length != 0) {
                    res.render('addcourse', {
                        message: "You already enrolled this course!"
                    })
                } else {
                    db.query("INSERT INTO courses_info SET ? ", {id:course_code, student_id: req.session.userid}, (error, result) => {
                        console.log(result);
                        if (error) {
                            res.render('addcourse', {
                                message: "An error occured, Please try again!2"
                            })
                        } else {
                            res.render('addcourse', {
                                message: "You have successfully enrolled!"
                            })
                        }
                    })
                }
            })
            
        }
    })
}



exports.getEnrolledCourses = (req, res) => {
    
    // query the database for all of the courses the user is enrolled in
    db.query("SELECT course_number, course_description, professor FROM courses_info JOIN courses WHERE courses.id = courses_info.id AND courses_info.student_id = ?", [req.session.userid], (error, results) => {
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
                message: "You are not enrolled in any courses",
            })
        }
        
        // 
        else {
            console.log("HERE");
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

exports.setting = (req, res) => {
    
}


// Professor's page
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

exports.viewcourses = (req, res) => {
    let email = req.session.email;
    db.query("SELECT username FROM users WHERE email = ?", [email], (error, results) => {
        if (error) {
            console.log(error);
            res.render("admin-view-courses", {
                message: "An unexpected error occured"
            })
        } else {
            db.query("SELECT * FROM courses", (error, results) => {
            if(error) {
                console.log(results);
                res.render('admin-view-courses', {
                    message: "An error occured!"
                })} else {
                        req.results = results;
                        console.log("req.results: " + req.results);
                        console.log(results);
                        res.render("admin-view-courses", {
                        results: results
                        })
                }
            })
        }
    })
};