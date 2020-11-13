// Admin Class File
console.log("This is the admin class file");

// Listen to login event
var log_in_button = document.getElementById('login');
log_in_button.addEventListener('submit', runEvent);

// Collect user input
// need check if the info is matched with database
function runEvent(e) {
    e.preventDefault();
    console.log(e.type);
    var user_name = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(user_name);
    console.log(password);
}