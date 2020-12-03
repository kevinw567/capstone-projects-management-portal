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


exports.addproject = (req, res) => {
    const { projectName, projectDescription, clientName, clientEmail, extraDetails, courseIdentification } = req.body;

    let email = req.session.email;
    console.log(req.session.userid);
    // db.query("SELECT username FROM users WHERE email=?", [email], (error, result)=>{
    //     if (error) {
    //         res.render("addproject", {
    //             message: "An error occured!"
    //         })
    //     } else {
    db.query("INSERT INTO projects SET ?", { project_name:projectName, project_detail: projectDescription, client_name: clientName, client_contact:clientEmail, course_id:courseIdentification , extra_details:extraDetails, user_id:req.session.userid }, (error, result) => {
        if(error) {
            res.render('addproject', {
                message: "An error occured. Please try again!"
            })
        } else {
            res.render('addproject', {
                message: "Project Created!"
            })}
        })};
            // })};

exports.viewprojects = (req, res) => {
    let email = req.session.email;
    db.query("SELECT username FROM users WHERE email = ?", [email], (error, results) => {
        if (error) {
            console.log(error);
            res.render("admin-view-projects", {
                message: "An unexpected error occured"
            })
        } else {
            db.query("SELECT * FROM projects", (error, results) => {
            if(error) {
                res.render('admin-view-projects', {
                    message: "An error occured!"
                })} else {
                        req.results = results;
                        console.log("req.results: " + req.results);
                        console.log(results);
                        res.render("admin-view-projects", {
                        results: results
                        })
                }
            })
        }
    })
};

exports.viewsingleproject = (req, res) => {
    let email = req.session.email;
    const {projectName, projectDetail, clientName, clientContact, extraDetails} = req.body;
    console.log("___Fields___\n" + projectName + "\n" + projectDetail + "\n" + clientName + "\n" + clientContact + "\n" + extraDetails + "\n");
    db.query("SELECT * FROM projects WHERE project_name = ?", [projectName], (error, results) => {
    if(error) {
        res.render('view-project', {
            message: "An error occured!"
        })} else {
                req.results = results;
                console.log("req.results: " + req.results);
                console.log(results);
                res.render("view-project", {
                    project_name: results[0]['project_name'],
                    course_id: results[0]['course_id'],
                    project_detail: results[0]['project_detail'],
                    client_name: results[0]['client_name'],
                    client_contact: results[0]['client_contact'],
                    extra_details: results[0]['extra_details']
                })
        }
    })
    // res.render('view-project');
}


// get available projects for enrolled classes
exports.getProjects = (req, res) => {
    // query the database for userid
    db.query("SELECT id FROM courses_info WHERE student_id = ?", [req.session.userid], (error, results) =>{
        if (error) {
            res.render("projects", {
                message: "An unexpected error occured"
            })
        }

        else {
            console.log(result);
            db.query("SELECT project_name, project_detail, client_name, client_contact, extra_details FROM projects", (error, results) => {
                if (error) {
                    res.render("projects", {
                        message: "An unexpected error occured"
                    })
                }

                else {
                    console.log(results);
                }
            })
        }

        db.query("SELECT project_name, project_detail, client_name, client_contact, extra_details FROM projects", (error, results) => {
            if (error) {
                res.render("projects", {
                    message: "An error occured"
                })
            }

            else {
                res.render("projects", {
                    results: results
                })
            }
        })
    })
}





exports.submitprefs = (req, res) => {
    const { pref1, pref2, pref3 } = req.body;
    // query the database for the course id
    db.query("SELECT course_id FROM projects WHERE project_name = ?", [pref1], (error, results) => {
        if (error) {
            res.render("projects", {
                message: "An unexpected error occured"
            })
        }

        else {
            db.query("INSERT INTO courses_info SET ?", { id: results[0].course_id, student_id: req.session.userid, proj_preference1: pref1, proj_preference2: pref2, proj_preference3: pref3 }, (error, result) => {
                if (error) {
                    // if a bad null error is thrown, ask user to relogin
                    if (error.code === "ER_BAD_NULL_ERROR") {
                        res.render("projects", {
                            message: "An error occured. Please relogin and try again."
                        })
                    }

                    else {
                        res.render("projects", {
                            message: "Unable to submit project preferences"
                        })
                    }
                }

                else {
                    res.render("projects", {
                        message: "Successfully submitted project preferences"
                    })
                }
            })
        }
    })





        





}