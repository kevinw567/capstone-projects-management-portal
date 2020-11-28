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
    let e = false;
    // get information from the form
    const {username, password, confirmPassword, email, role } = req.body;
    
    // check password
    if (password != confirmPassword) {
        res.render('register', {
            message: "Password do not match!"
        })
        e = true;
    }
    
    // query the database for the input email
    else{
        db.query("SELECT email FROM users WHERE email = ?", [email], (error, results) => {
        if (error) {
            console.log(error);
            res.render('register', {
                message: "An error occured1"
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

        // if passwords do not match send error message
        // else if (password !== confirmPassword) {
        //     return res.render('register', {
        //         message: "Passwords do not match"
        //     });
        // }
        // insert new user into the users table
        if (e === false) {
            db.query("INSERT INTO users SET ?", { username:username, email: email, authentication: password, role:role }, (error, results) => {
                if (error) {
                    console.log(error);
                    res.render('register', { 
                        message: "An error occured2"
                    })
                }
    
                else {
                    res.render('index', {
                        message: "Account registered"
                    })
                }
            })
    
            // insert new user and role into the roles table
            // db.query("SELECT id FROM users WHERE email = ?", [email], (error, results) => {
            //     if (error) {
            //         console.log(error);
            //         res.render('register', {
            //             message: "Anerror occured3"
            //         })
            //     }
            //     console.log(results);
            //     // parse the JSON results
            //     var str = JSON.stringify(results);
            //     var json = JSON.parse(str);
            //     Object.keys(results).forEach(function(key) {
            //         console.log(results[key]['id']);
            //         console.log(key);
            //         db.query("INSERT INTO roles SET ?", { role: role, user_id: results[key]['id'] })
                    
            //         res.render('index', { 
            //             message: "Account registered"
            //         })
            //     })
                
            // })
        }
    })};    
}

exports.login = (req, res) => {
    console.log(req.body);
    const { email, password, role } = req.body;
    // db.query("SELECT * FROM students WHERE user_id = ? AND password = ?", [name, password], (error, results) => {
    //     if (error) {
    //         console.log(error);
    //     }

    //     // if query returns no matches, cannot log in
    //     else if (results.length === 0) {                
    //         return res.render('index', {
    //             message: "Could not log in, try again"
    //         })
    //     }

    //     else {
    //         console.log(results); 
    //         return res.render('home');
    //     }
    // })
 
    db.query("SELECT * FROM users WHERE email = ? AND authentication = ? AND role = ?", [email, password, role], (error, results) => {
        if (error) {
            res.render('index', {
                message: "Could not log in, try again"
            })
        } else if (results.length === 0) {
            res.render('index', {
                message: "Wrong email or password2"
            })
        } else {
            if (role === 'student'){
                res.render('student');
            } else {
                res.render('professor');
            }
        }
    })

}
