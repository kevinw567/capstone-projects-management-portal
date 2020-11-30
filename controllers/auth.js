/**
 * This file contains the functions that will authenticate
 */

const mysql = require("mysql");
const md5 = require("md5");

const db = mysql.createConnection({
    // host IP address
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    // database name
    database: process.env.DATABASE
})

// register a new user
exports.register = (req, res) => {
    console.log(req.body);
    let e = false;
    // get information from HTML form
    const {username, password, confirmPassword, email, role } = req.body;    
    // check password
    if (password != confirmPassword) {
        res.render('register', {
            message: "Passwords do not match!"
        })
        e = true;
    }
    
    // query the database for the input email
    else{
        db.query("SELECT email FROM users WHERE email = ?", [email], (error, results) => {
        if (error) {
            console.log(error);
            res.render('register', {
                message: "An error occured"
            });
            e = true;
        }


        // if the email is already registered send a message and go back to register page
        else if (results.length > 0) {
            console.log(results);
            res.render('register', {
                message: "That email is already registered"
            });
            e = true;
        }

        // insert new user into the users table
        if (e === false) {
            db.query("INSERT INTO users SET ?", { username:username, email: email, authentication: md5(password), role:role }, (error, results) => {
                if (error) {
                    console.log(error);
                    res.render('register', { 
                        message: "An error occured"
                    })
                }
    
                else {
                    res.render('index', {
                        message: "Account registered"
                    })
                }
            })
    
        };    
    })}
}


exports.login = (req, res) => {
    const { email, password, role } = req.body;
    db.query("SELECT id FROM users WHERE email = ? AND authentication = ? AND role = ?", [email, md5(password), role], (error, results) => {
        if (error) {
            console.log(error);
            res.render('index', {
                message: "Could not log in, try again"
            })
        } else if (results.length === 0) {
            res.render('index', {
                message: "Wrong email or password"
            })
        } else {
            if (role === 'student'){
                req.params.userID = results[0].id;

                console.log("Logged in as student User ID: " + req.params.userID);
                
                res.render("student", {
                    userID: req.params.userID
                });
                
            } else {
                req.session.email = email;
                req.params.userID = results[0].id;

                res.render('professor', {
                    userID: req.params.userID
                });
                
            } 
        }
    })
}