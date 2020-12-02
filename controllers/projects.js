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
    const { projectName, projectDescription, clientName, clientEmail, extraDetails } = req.body;

    let email = req.session.email;
    db.query("SELECT username FROM users WHERE email=?", [email], (error, result)=>{
        if (error) {
            res.render("addproject", {
                message: "An error occured!"
            })
        } else {
            db.query("INSERT INTO projects SET ?", { project_name:projectName, project_detail: projectDescription, client_name: clientName, client_contact:clientEmail, extra_details:extraDetails, user_id:req.session.userid }, (error, result) => {
                if(error) {
                    res.render('addproject', {
                        message: "An error occured. Please try again!"
                    })
                } else {
                    res.render('addproject', {
                        message: "Project Created!"
                    })}
                })}
            })};

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
    const {projectName} = req.body;

    db.query("SELECT username FROM users WHERE email = ?", [email], (error, results) => {
        if (error) {
            console.log(error);
            res.render("view-project", {
                message: "An unexpected error occured"
            })
        } else {
            db.query("SELECT * FROM projects WHERE project_name = ?", [projectName], (error, results) => {
            if(error) {
                res.render('view-project', {
                    message: "An error occured!"
                })} else {
                        req.results = results;
                        console.log("req.results: " + req.results);
                        console.log(results);
                        res.render("view-project", {
                        results: results
                        })
                }
            })
        }
    })
}


// get available projects for enrolled classes
exports.getProjects = (req, res) => {
    // query the database for userid
    db.query("SELECT id FROM users WHERE email=?", [req.session.email], (error, result)=>{
        if (error) {
            res.render("projects", {
                message: "An unexpected error occured"
            })
        }

        else {
            console.log(result);
            db.query("SELECT id FROM courses_info WHERE student_id = ?", [req.session.userid], (error, results) => {
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
    db.query("INSERT INTO courses_info SET ?", { proj_preference1: pref1, proj_preference2: pref2, proj_preference3: pref3 }, (error, result) => {
        if (error) {
            res.render("projects", {
                message: "Unable to submit project preferences"
            })
        }

        else {
            res.render("projects", {
                message: "Successfully submitted project preferences"
            })
        }
    })
}