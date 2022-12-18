const api = 'http://' + window.location.hostname;
let login = document.getElementById("login");
let signup = document.getElementById("signup");
let loginSpan = document.getElementsByClassName("login-span");
let signupSpan = document.getElementsByClassName("signup-span");

signup.style.display = "flex";
login.style.display = "none";

function showLogin (){
	signup.style.display = "none";
	login.style.display = "flex";
}
function showSignup(){
	login.style.display = "none";
       	signup.style.display = "flex";
}

// Create new user
createNewUser()

function createNewUser () {
	form = document.getElementById("signup-button");
	form.addEventListener('submit', postNewUser);
}


function postNewUser (event) {
	event.preventDefault()
	alert("You clicked the submit button");
	const newUser = {
		name: $("INPUT#fname").val() + $("INPUT#lname").val(),
		email: $("INPUT#email").val(),
		password: $("INPUT#pword").val()
	};
	const createUrl = 'http://0.0.0.0:5005/coballo/users';
	fetch(createUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newUser) });

	/**$.ajax({
		type: 'POST',
		url: api + ':5005/coballo/users',
		data: json.parse(newUser),
		ContentType: 'application/json',
		dataType: 'json',
		success: function(User) {
			alert('User ' + User.name + " created");
		},
		error: function() {
			alert("An error has occured");
		}
	});*/
});
