#!/usr/bin/node

$('document').ready(function () {
	  const api = 'http://' + window.location.hostname;
	// Create new user
	button = document.getElementById("signup_button")
	button.on('click', function() {
		const req = new XMLHttpRequest();
		const newUser = {
			name: $("INPUT#fname").val() + $("INPUT#lname").val(),
			email: $("INPUT#email").val(),
			password: $("INPUT#pword").val(),
		};
		$.ajax({
			type: 'POST',
			url: '/coballo/users',
			data: newUser,
			success: function(User) {
				alert('User ' + User.name + " created");
			}
			error: function() {
				alert("An error has occured");
			}
		});
	});
});
