// Student register

// User object
class User {
    constructor(username, password, email, student_id) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.student_id = student_id;
    }
}

// Lister to submit event
var register = document.getElementById('login');
register.addEventListener('submit', runEvent);

// collecting student info and check validation
// If all info are valid, AND not in database yet, add to database and return to login page
function runEvent(e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirm = document.getElementById('confirm-password').value;
    var email = document.getElementById('user-email').value;
    var student_id = document.getElementById('student_id').value;
    if (password != confirm) {
        var error = document.getElementById("error-password");
        error.textContent = "Password does not match!";
        error.style.color = 'red';
        error.style.display = 'inline';
        setTimeout(()=>error.remove(), 3000);
    } else if (isNaN(student_id)) {
        var error = document.getElementById('error-id');
        error.textContent = "Invalid Student ID";
        error.style.color = 'red';
        error.style.display = 'inline';
        setTimeout(()=>error.remove(), 3000);
    } else {
        var user = new User(username, password, email, student_id);
        user = JSON.stringify(user);
        console.log(user);
        location.replace("index.html");
    }
}