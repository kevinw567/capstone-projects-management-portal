// import modules
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");

const app = express();

dotenv.config({ path: './.env' });
// create database connection
const db = mysql.createConnection({
    // host IP address
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    // database name
    database: process.env.DATABASE,
});

// directory that will hold static front end files
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// this allows us to read the information from the HTML forms
app.use(express.urlencoded({ extended: false }));

// makes sure that the values from the forms are JSON values
app.use(express.json());

// set the view engine
app.set("view engine", "hbs");

// attempt to connect to the database
db.connect((error) => {
    if (error) {
        console.log(error);
    }

    else {
        console.log("MySQL Connected ...");
    }
})

// define routes to use
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

// tell express which port to listen to
app.listen("3000", () => {
    console.log("Server started on port 3000");
});