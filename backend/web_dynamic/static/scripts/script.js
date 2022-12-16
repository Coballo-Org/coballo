#!/usr/bin/node

$('document').ready(function () {
	  const api = 'http://' + window.location.hostname;
	// Create new user
	button = document.getElementById("signup_button")
	button.onclick( function() {
		const req = new XMLHttpRequest();
		const newUser = {
			name: $("INPUT#fname") + $("INPUT#lname")
			email: $("INPUT#email")
			password: $("INPUT#pword")
		};

		req.open('POST', 'http://0.0.0.0:5000/coballo/users');
		req.addEventListener('Load', function() {
			if (req.status === 201 && req.readyState === 4) {
				const res = JSON.parse(req.responseText);
				alert(res.name + "account has been created succesfully");
			} else {
				alert("An error has ocurred and the account cannot be created");
			}
		});
		req.send(JSON.stringify(newUser));
	});
});
