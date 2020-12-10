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

exports.addproject = (req, res) => {
    const { projectName, projectDescription, clientName, clientEmail, extraDetails, courseID} = req.body;

    let email = req.session.email;
    db.query("INSERT INTO projects SET ?", { project_name:projectName, project_detail: projectDescription, client_name: clientName, client_contact:clientEmail, extra_details:extraDetails, user_id:req.session.userid, course_id:courseID }, (error, result) => {
        if(error) {
            res.render('professor/addproject', {
                message: "An error occured. Please try again!"
            })
        } else {
            res.render('professor/addproject', {
                message: "Project Created!"
            })}
        })};

exports.viewprojects = (req, res) => {
    // let email = req.session.email;
    // db.query("SELECT username FROM users WHERE email = ?", [email], (error, results) => {
    //     if (error) {
    //         console.log(error);
    //         res.render("professor/admin-view-projects", {
    //             message: "An unexpected error occured"
    //         })
    //     } else {
    //         db.query("SELECT * FROM projects, courses WHERE projects.course_id=courses.id", (error, results) => {
    //         console.log(results);
    //         if(error) {
    //             res.render('professor/admin-view-projects', {
    //                 message: "An error occured!"
    //             })} else {
    //                     req.results = results;
    //                     res.render("professor/admin-view-projects", {
    //                     results: results
    //                     })
    //             }
    //         })
    //     }
    // })
    // console.log(req.body);
    // const {  } = req.body;
    console.log(req.body);
    db.query("SELECT * FROM projects, courses WHERE courses.user_id = projects.user_id AND projects.course_id = courses.id AND courses.user_id=?", [req.session.userid], (error, result) => {
        // console.log(result, "-----------");
        console.log(result);
        if(error) {
            res.render("professor/admin-view-projects", {
                message: "An error occured!11"
            })
        } else if (result.length == 0) {
            res.render("professor/admin-view-projects", {
                message: "No project found"
            })
        } else {
            res.render("professor/admin-view-projects", {
                results: result
            })
        }
    })
};

exports.deleteproject = (req, res) => {
    const { project_id } = req.body;
    // console.log(req.body);
    console.log(project_id);
    console.log(req.body);
    db.query("DELETE FROM projects WHERE project_id = ?", [project_id], (error, result)=> {
        if(error) {
            res.render("professor/admin-view-projects", {
                message: "An error occured!"
            })
        } else {
            this.viewprojects(req, res);
        }
    })
}
exports.viewsingleproject = (req, res) => {
    let email = req.session.email;
    const { projectName, projectDetail, clientName, clientContact, extraDetails, courseNumber, professor, project_id, courseID } = req.body;

    if (req.session.role == 'student') {
        res.render('student/view-project', {
            project_name: projectName,
            project_detail: projectDetail,
            course_number: courseNumber,
            client_name: clientName,
            client_contact: clientContact,
            extra_details: extraDetails,
            // project_id: project_id
        })
    } else {
        res.render('professor/view-project', {
            project_name: projectName,
            project_detail: projectDetail,
            course_number: courseNumber,
            client_name: clientName,
            client_contact: clientContact,
            extra_details: extraDetails,
            project_id: project_id,
            courseID: courseID,
        })
    }
}

//update a project's info
exports.updateProject = (req, res) => {
    console.log(req.body);
    const { client_name, client_contact, project_detail, project_id } = req.body;
    db.query("UPDATE projects SET ? WHERE project_id = ?", [{client_name:client_name, client_contact:client_contact, project_detail:project_detail}, project_id], (error, result) => {
        if(error) {
            res.render('professor/view-project', {
                message: "An error occured!"
            })
        } else {
            res.render('professor/view-project', {
                message: "Project updated!",
                client_name:client_name,
                client_contact:client_contact,
                project_detail: project_detail,
                project_id: project_id
            })
        }
    })

}


// get available projects for enrolled classes
exports.getProjects = (req, res) => {

    db.query("SELECT * FROM projects, enrolled, courses WHERE enrolled.student_id = ? AND projects.course_id = enrolled.course_id AND courses.id=projects.course_id ORDER BY courses.id", [req.session.userid], (error, result) => {
        console.log(result);
        if(error) {
            res.render("student/projects", {
                message: "An error occured!"
            })
        } else if (result.length == 0) {
            res.render("student/projects", {
                message: "No project posted"
            })
        }
        else {
            let courses = [];
            let s = new Set();
            for (let i = 0; i < result.length; i++) {
                let c_id = result[i]['course_id'];
                let c_number = result[i]['course_number'];
                if(!s.has(c_id)) {
                    s.add(c_id);
                    courses.push({course_id: c_id, course_number:c_number})
                }
            }
            res.render("student/projects", {
                results: result,
                courses: courses
            })
        }
    })
    // query the database for the enrolled course's course_number
    // db.query("SELECT course_number FROM enrolled WHERE student_id = ?", [req.session.userid], (error, results) => {
    //     if (error) {
    //         res.render("student/projects", {
    //             message: "An unexpected error occured"
    //         })
    //     } else if (results.length == 0){
    //         res.render("student/projects", {
    //             message: "Please enroll a course before viewing projects!"
    //         })
    //     }

    //     else {
    //         db.query("SELECT num_prefs, course_number, project_name, project_detail, client_name, client_contact, extra_details FROM projects JOIN courses ON course_id = courses.id WHERE courses.id = ?", [results[0].course_number], (error, results) => {
    //             if (error) {
    //                 res.render("student/projects", {
    //                     message: "An unexpected error occured"
    //                 })
    //             } else if (results.length == 0) {
    //                 res.render("student/projects", {
    //                     message: "No projects posted"
    //                 })
    //             }

    //             else {
    //                 res.render("student/projects", {
    //                     results: results,
    //                     prefs: results[0].num_prefs
    //                 })
    //             }
    //         })
    //     }
    // })
}

exports.select_project = (req, res) => {
    console.log(req.body);
    const {course_id} = req.body;
    db.query("SELECT * FROM projects, courses WHERE projects.course_id=courses.id AND projects.course_id=?",[course_id], (error, result) => {
        console.log(result);
        if (error) {
            res.render("student/projects", {
                message: "An error occured!"
            })
        } else{
                res.render("student/select-project", {
                    results: result,
                    prefs: result[0].num_prefs
                });}
    })
}

// submit project preferences to database
exports.submitprefs = (req, res) => {
    const { pref1, pref2, pref3, pref4, pref5 } = req.body;
    // query the database for the course id
    db.query("SELECT course_id FROM projects WHERE project_name = ?", [pref1], (error, results) => {
        if (error) {
            res.render("student/projects", {
                message: "An unexpected error occured"
            })
        }

        else {
            db.query("INSERT INTO courses_info SET ?", { id: results[0].course_id, student_id: req.session.userid, proj_preference1: pref1, proj_preference2: pref2, proj_preference3: pref3, proj_preference4: pref4, proj_preference5: pref5 }, (error, result) => {
                if (error) {
                    // enter if statement if a bad null error is thrown, ask user to relogin
                    if (error.code === "ER_BAD_NULL_ERROR") {
                        console.log(error);
                        res.render("student/projects", {
                            message: "An error occured. Please relogin and try again"
                        })
                    }

                    // enter else if statement if a duplicate primary key error is thrown
                    else if (error.code === "ER_DUP_ENTRY") {
                        res.render("student/projects", {
                            message: "You have already submitted your project preferences"
                        })
                    }

                    else {
                        console.log(error);
                        res.render("student/projects", {
                            message: "Unable to submit project preferences"
                        })
                    }
                }

                else {
                    res.render("student/projects", {
                        message: "Sucessfully submitted project preferences"
                    })
                }
            })
        }
    })
}


exports.getStudentProjects = (req, res) => {
    db.query("SELECT * FROM courses_info WHERE student_id = ?", [req.session.userid], (error, results)=> {
        if (error) {
            res.render("student/student-project", {
                message: "An error occured"
            })
        } else if(results.length == 0) {
            res.render("student/student-project", {
                message: "You have not choose any projects!"
            })
        } else {
            res.render("student/student-project", {
                results: results
            })
        }
    })
}
