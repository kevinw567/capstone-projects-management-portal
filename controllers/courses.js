/**
 * This file contains the functions that will retrieve the user's course information from the database.
 */
const mysql = require("mysql");
const e = require("express");
const md5 = require("md5");

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
            res.render('student/addcourse', {
                message: "An error occured, Please try again!"
            })
        } else if (result.length == 0) {
            res.render('student/addcourse', {
                message: "No course found with that course code!"
            })
        } else {
            // db.query("SELECT * FROM courses_info WHERE student_id = ? AND id = ?", [req.session.userid, course_code], (error, result) => {
            //     // console.log(req.session.userid);
            //     // console.log(result);
            //     if (error) {
            //         res.render('student/addcourse', {
            //             message: "An error occured, Please try again!"
            //         })
            //     } else if(result.length != 0) {
            //         res.render('student/addcourse', {
            //             message: "You already enrolled this course!"
            //         })
            //     } else {
                    db.query("INSERT INTO enrolled SET ? ", {course_number:course_code, student_id: req.session.userid}, (error, result) => {
                        console.log(result);
                        if (error) {
                            console.log(error)
                            res.render('student/addcourse', {
                                message: "An error occured, Please try again!2"
                            })
                        } else {
                            res.render('student/addcourse', {
                                message: "You have successfully enrolled!"
                            })
                        }
                    })
                }
            })
            
        }
    // })
// }



exports.getEnrolledCourses = (req, res) => {
    
    // query the database for all of the courses the user is enrolled in
    db.query("SELECT courses.course_number, course_description, professor FROM enrolled JOIN courses WHERE courses.id = enrolled.course_number AND enrolled.student_id = ?", [req.session.userid], (error, results) => {
        if (error) {
            console.log(error);
            res.render("student/courses", {
                userID: req.userID,
                message: "An unexpected error occured"
            })
        }
        
        // enter if statement if the user is not enrolled in any courses
        else if (results.length <= 0) {
            res.render("student/courses", {
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
            res.render("student/courses", {
                userID: req.userID,
                results: results
            })
        }
    })


}

exports.setting = (req, res) => {
    db.query("SELECT * FROM users WHERE id = ?", [req.session.userid], (error, result) => {
        if(error) {
            if (req.session.role == 'student') {
                res.render('student/setting', {
                    message: "An unknown error occured!",
                    username: result[0]['username'],
                    email: result[0]['email']
                })
            } else {
                res.render('professor/admin-settings', {
                    message: "An unknown error occured!",
                    username: result[0]['username'],
                    email: result[0]['email']
                })
            }
        } else {
            if (req.session.role == 'student') {
                console.log('stu-----');
                res.render('student/setting', {
                    username: result[0]['username'],
                    email: result[0]['email']
                })
            } else {
                console.log('------');
                res.render('professor/admin-settings', {
                    username: result[0]['username'],
                    email: result[0]['email']
                })
            }
        }
    })
}

exports.updateSetting = (req, res) => {
    const { username, email, password, new_password, confirm_password } = req.body;
    console.log(username);
    console.log(email);
    console.log(new_password);
    console.log(confirm_password);
    console.log(req.session.role);
    db.query("SELECT * FROM users WHERE id = ?", [req.session.userid], (error, result) => {
        if (req.session.role == 'student') {
            if(error) {
                res.render('student/setting', {
                    message: "An unknown error occured",
                    username: username,
                    email: email
                })
            } else if (md5(password) != result[0]['authentication']) {
                res.render('student/setting', {
                    message: "Wrong password",
                    username: username,
                    email: email
                })
            } else if (new_password != confirm_password) {
                res.render('student/setting', {
                    message: "New password does not match!",
                    username: username,
                    email: email
                })
            } else if (username == result[0]['username'] && email == result[0]['email'] && !new_password && !confirm_password ) {
                res.render('student/setting', {
                    message: "Nothing updated!",
                    username: username,
                    email: email
                })
            } else {
                if (new_password) {
                    db.query("UPDATE users SET ? WHERE id = ?", [{username:username, email:email, authentication:md5(new_password)}, req.session.userid], (error, result) => {
                        if(error) {
                            res.render('student/setting', {
                                message: "An unknown error occured!",
                                username: username,
                                email: email
                            })
                        } else {
                            res.render('student/setting', {
                                message: "Updated",
                                username: username,
                                email: email
                            })
                        }
                    })
                } else {
                    db.query("UPDATE users SET ? WHERE id = ?", [{username:username, email:email}, req.session.userid], (error, result) => {
                        if(error) {
                            res.render('student/setting', {
                                message: "An unknown error occured!",
                                username: username,
                                email: email
                            })
                        } else {
                            res.render('student/Setting', {
                                message: "Updated",
                                username: username,
                                email: email
                            })
                        }
                    })
                }
            }
        } else if(req.session.role == 'professor') {
            if(error) {
                res.render('professor/admin-settings', {
                    message: "An unknown error occured",
                    username: username,
                    email: email
                })
            } else if (md5(password) != result[0]['authentication']) {
                res.render('professor/admin-settings', {
                    message: "Wrong password",
                    username: username,
                    email: email
                })
            } else if (new_password != confirm_password) {
                res.render('professor/admin-settings', {
                    message: "New password does not match!",
                    username: username,
                    email: email
                })
            } else if (username == result[0]['username'] && email == result[0]['email'] && !new_password && !confirm_password ) {
                res.render('professor/admin-settings', {
                    message: "Nothing updated!",
                    username: username,
                    email: email
                })
            } else {
                if (new_password) {
                    db.query("UPDATE users SET ? WHERE id = ?", [{username:username, email:email, authentication:md5(new_password)}, req.session.userid], (error, result) => {
                        if(error) {
                            res.render('professor/admin-settings', {
                                message: "An unknown error occured!",
                                username: username,
                                email: email
                            })
                        } else {
                            res.render('professor/admin-settings', {
                                message: "Updated",
                                username: username,
                                email: email
                            })
                        }
                    })
                } else {
                    db.query("UPDATE users SET ? WHERE id = ?", [{username:username, email:email}, req.session.userid], (error, result) => {
                        if(error) {
                            res.render('professor/admin-settings', {
                                message: "An unknown error occured!",
                                username: username,
                                email: email
                            })
                        } else {
                            res.render('professor/admin-settings', {
                                message: "Updated",
                                username: username,
                                email: email
                            })
                        }
                    })
                }
            }

        }
    })
}


// Professor's page
exports.createcourse = (req, res) => {
    const { coursenumber, description, num_prefs } = req.body;
    // generate a random code for the course
    course_id = Math.random().toString(36).substring(2, 10);
    let email = req.session.email;
    db.query("SELECT username FROM users WHERE email=?", [email], (error, result)=>{
        if (error) {
            res.render("professor/createcourse", {
                message: "An error occured!"
            })
        } else {
            db.query("INSERT INTO courses SET ?", { id:course_id, course_number:coursenumber, course_description:description, professor: result[0]['username'], user_id:req.session.userid, num_prefs: num_prefs }, (error, result) => {
                if(error) {
                    console.log(error);
                    res.render('professor/createcourse', {
                        message: "An error occured. Please try again!"
                    })
                } else {
                    res.render('professor/createcourse', {
                        message: "Course created!"
                    })}
                })}
            })};

exports.viewcourses = (req, res) => {
    // let email = req.session.email;
    // // console.log(req.body);
    // console.log("---------");
    // db.query("SELECT username FROM users WHERE email = ?", [email], (error, results) => {
    //     if (error) {
    //         res.render("professor/admin-view-courses", {
    //             message: "An unexpected error occured"
    //         })
    //     } else {
    //         db.query("SELECT * FROM courses WHERE user_id = ?",[req.session.userid], (error, results) => {
    //         if(error) {
    //             res.render('professor/admin-view-courses', {
    //                 message: "An error occured!"
    //             })} else {
    //                     res.render("professor/admin-view-courses", {
    //                     results: results
    //                     })
    //             }
    //         })
    //     }
    // })
    db.query("SELECT * FROM courses WHERE user_id = ?", [req.session.userid], (error, result) => {
        if (error) {
            res.render("professor/admin-view-courses", {
                message: "An error occured!"
            })
        } else if (result.length == 0) {
            res.render("professor/admin-view-courses", {
                message: "No courses found!"
            })
        } else {
            res.render("professor/admin-view-courses", {
                results: result
            })
        }
    })
};

exports.deletecourses = (req, res) => {
    const { course_id } = req.body;
    console.log(course_id, "--------1");
    db.query("DELETE FROM courses WHERE id = ?", [course_id],(error, result) => {
        if(error) {
            res.render("professor/admin-view-courses", {
                message: "An error occured!"
            })
        } else {
            db.query("DELETE FROM projects WHERE course_id = ?", [course_id], (error, result) => {
                if (error) {
                    res.render("professor/admin-view-courses", {
                        message: "An error occured!"
                    })
                } else {
                    this.viewcourses(req, res);
                }
            })
        }
    })
}