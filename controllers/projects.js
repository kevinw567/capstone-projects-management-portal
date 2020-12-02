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
                    project_detail: results[0]['project_detail'],
                    client_name: results[0]['client_name'],
                    client_contact: results[0]['client_contact'],
                    extra_details: results[0]['extra_details']
                })
        }
    })
}

exports.submitprefs = (req, res) => {
    console.log("Submitting preferences");
    const { pref1, pref2, pref3 } = req.body;
    console.log(pref1);
    res.render("projects", {
        message: "Successfully submitted project preferences"
    })
}