#!/usr/bin/node

var presentUser = ""
// Create new user (sign up)

$(function (){
	var $name = $('#fname');
	var $lname = $('#lname');
	var $email = $('.email');
	var $pword = $('.pword');

	$('#signup-button').on('click', function() {
		var user = {
			"first_name": $name.val(),
			"last_name": $lname.val(),
			"email": $email.val(),
			"password": $pword.val(),
		};

		$.ajax({
			type: 'POST',
			url: 'http://100.25.165.74:5005/coballo/users',
			data: JSON.stringify(user),
			contentType: 'application/json',
			dataType: 'json',
			success: function(newUser) {
				alert(newUser.first_name + " account has been created successfully");
				var presentUser = newUser;
				window.location = "../static/myprojects.html"
			},
			error: function() {
				alert('An error has occured and the user cannot be created');
			}
		});
	});
});


// Get old user (log in)
$(function () {
	var $email = $('.login-email');
	var $password = $('.login-pword');

	$('#login-button').on('click', function() {
		var user = {
			"email": $email.val(),
			"password": $password.val(),
		};

		$.ajax({
			type: 'POST',
			url: 'http://100.25.165.74:5005/coballo/user',
			data: JSON.stringify(user),
			contentType: 'application/json',
			dataType: 'json',
			success: function(oldUser) {
				var presentUser = oldUser;
				alert("You have been successfully logged in");
				window.location = "../static/myprojects.html";
			},
			error: function() {
				alert("You have entered incorrect details, please check and try again");
			}

		});
	});
});

