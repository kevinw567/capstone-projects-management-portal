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
            db.query("INSERT INTO projects SET ?", { project_name:projectName, project_detail: projectDescription, client_name: clientName, client_contact:clientEmail, extra_details:extraDetails, user_id:result[0]['username'] }, (error, result) => {
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
            db.query("SELECT id FROM courses_info WHERE student_id = ?", [result[0]["id"]], (error, results) => {
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