/**
 * This file contains the functions that will authenticate
 */

const mysql = require("mysql");

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
    // get information from the form
    const {fname, lname, username, password, confirmPassword, email, role } = req.body;
    

    
    // query the database for the input email
    db.query("SELECT email FROM users WHERE email = ?", [email], (error, results) => {
        if (error) {
            console.log(error);
            return res.render('register', {
                message: "An error occured"
            });
        }

        // if the email is already registered send a message and go back to register page
        else if (results.length > 0) {
            console.log(results);
            return res.render('register', {
                message: "That email is already registered"
            });
        }

        // if passwords do not match send error message
        else if (password !== confirmPassword) {
            return res.render('register', {
                message: "Passwords do not match"
            });
        }
    });
    
    
    // insert new user into the users table
    db.query("INSERT INTO users SET ?", { first_name: fname, last_name: lname, email: email, authentication: password }, (error, results) => {
        if (error) {
            console.log(error);
        }
    })

    // insert new user and role into the roles table
    db.query("INSERT INTO role SET ?", { role: role }, (error) => {
        if (error) {
            console.log(error);
        }
    })
        
    return res.render('index', { 
        message: "Account registered"
    })
}

exports.login = (req, res) => {
    console.log(req.body);
    const { name, password, role } = req.body;
    db.query("SELECT * FROM users WHERE user_id = ? AND password = ?", [name, password], (error, results) => {
        if (error) {
            console.log(error);
        }

        // if query returns no matches, cannot log in
        else if (results.length === 0) {                
            return res.render('index', {
                message: "Could not log in, try again"
            })
        }

        else {
            console.log(results); 
            return res.render('home');
        }
    })
}