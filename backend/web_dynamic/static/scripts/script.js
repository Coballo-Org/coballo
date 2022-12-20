
// Create new user (sign up)

$(function (){
	var $name = $('#fname');
	var $lname = $('#lname');
	var $email = $('.email');
	var $pword = $('.pword');

	$('#signup-button').on('click', function() {
		var user = {
			"name": $name.val() + ' ' + $lname.val(),
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
				alert("Your account has been created successfully");
			},
			error: function() {
				alert('An error has occured and the user cannot be created');
			}
		});
	});
});

// Get old user (log in)
$(function () {
