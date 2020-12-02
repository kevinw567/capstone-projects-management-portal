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
    console.log(req.session.userid);
    // db.query("SELECT username FROM users WHERE email=?", [email], (error, result)=>{
    //     if (error) {
    //         res.render("addproject", {
    //             message: "An error occured!"
    //         })
    //     } else {
    db.query("INSERT INTO projects SET ?", { project_name:projectName, project_detail: projectDescription, client_name: clientName, client_contact:clientEmail, extra_details:extraDetails, user_id:req.session.userid }, (error, result) => {
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
    const {project_name, project_detail, client_name, project_id} = req.body;

    // db.query("SELECT username FROM users WHERE email = ?", [email], (error, results) => {
    //     if (error) {
    //         console.log(error);
    //         res.render("view-project", {
    //             message: "An unexpected error occured"
    //         })
    //     } else {
    //         db.query("SELECT * FROM projects WHERE project_name = ?", [projectName], (error, results) => {
    //         if(error) {
    //             res.render('view-project', {
    //                 message: "An error occured!"
    //             })} else {
    //                 console.log(results);
    //                 res.render('view-project')
    //             }
    //         })
    //     }
    // })
    console.log(project_id);
    console.log(project_name);
    db.query("SELECT * FROM projects WHERE id = ?", [project_id], (error, result)=> {
        if(error) {
            res.render("admin-view-projects", {
                message: "An error occured"
            })
        } else {
            res.render('view-project', {
                project_name: result[0]['project_name'],
                project_detail: result[0]['project_detail'],
                client_name: result[0]['client_name'],
                client_contact: result[0]['client_contact'],
                extra_details: result[0]['extra_details']
                
            })
        }
    })
    // res.render('view-project');
}

exports.submitprefs = (req, res) => {
    console.log("Submitting preferences");
    const { pref1, pref2, pref3 } = req.body;
    console.log(pref1);
    res.render("projects", {
        message: "Successfully submitted project preferences"
    })
}