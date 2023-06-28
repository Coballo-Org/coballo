#!/usr/bin/node


// Create new user (sign up)
$(function (){
	var $name = $('#fname');
	var $lname = $('#lname');
	var $email = $('.email');
	var $pword = $('.pword');

	$('#signup-button').on('click', function() {
		var user = JSON.stringify({
			"first_name": $name.val(),
			"last_name": $lname.val(),
			"email": $email.val(),
			"password": $pword.val(),
		});

		var url = '/users'
		request.post(url, user)
		.then((newUser) => {
			presentUser = {
				"name": newUser.first_name,
				"id": newUser.id,
				"email": newUser.email,
			}
			$("#messages").append("<p>" + newUser.first_name + " account has been created successfully</p>");
			window.localStorage.clear();
			window.localStorage.setItem('presentUser', JSON.stringify(presentUser));
			window.location = "../static/avail-projects.html"
		}).catch((err) => {
			$("#messages").html('<p>An error has occured and the user cannot be created</p>');
		})
	});
});


// Get old user (log in)
$(function () {
	var $email = $('.login-email');
	var $password = $('.login-pword');

	$('#login-button').on('click', function() {
		var user = JSON.stringify({
			"email": $email.val(),
			"password": $password.val(),
		});

		var url = '/user';
		request.post(url, user)
		.then((oldUser) => {
			var presentUser = {
				"name": oldUser.first_name,
				"id": oldUser.id,
				"email": oldUser.email,
			}
			$("#messages").append("<p>You have succesfully logged in</p>");
			window.localStorage.clear();
			window.localStorage.setItem('presentUser', JSON.stringify(presentUser));
			window.location = "../static/avail-projects.html";
		}).catch((err) => {
			$("#messages").html("<p>You have entered incorrect details, please check and try again</p>");
		})
	});
});

