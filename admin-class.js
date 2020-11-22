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
	let role = document.getElementById("role").value;
	console.log(role);
	if(isValidUser(user_name,password)){
		//ajax call to varify user is student or instaractor
		if(isStudent()){
			// display student info with projects submission info
		}else{
			//display all current students by default
		}
	}else{
		document.getElementById("login").insertAdjacentHTML("beforeBegin","<div id=error style=\"color:red;\">User name or Password is incorrect</div>");
		let a = document.getElementById("error");
		setTimeout(()=>a.remove(), 3000);
	}
	
    console.log(user_name);
    console.log(password);
}

function isValidUser(user_name,password){
	//ajax call to back end for for user account validation.
	//return invavalidvalid user for now
	
	return false;
}
