#!/usr/bin/node

// get the current user details
let user = JSON.parse(window.localStorage.getItem('presentUser'));

title = document.getElementById("titler")
title.append( user.name + " Workspace" );

$(function () {
	$('#logout').on("click", function() {
		window.localStorage.clear();
		window.location = 'http://100.25.165.74:5004/coballo';
	});
});

// populate the page with the project details
$(function () {
	repo = document.getElementById("project-repos");
	$.ajax({
		type: 'GET',
		url: 'http://100.25.165.74:5005/coballo/users/' + user.id + '/projects',
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function (projects) {
			$.each(projects, function (index, item) {
				$("#project-repos").append('<li>' + item.title + '</li>')
				$("#repo-info").append("<br><h1>Project Title:<span>" + item.title + "</span></h1><h6><span>Description:</span>" + item.description + "</h6><p>README:</p><i>" + item.readme + "</i><br><br><button class='go-to-code'>Go to Code</button><button class='edit-project' id='edit-proj-" + item.id + "'>Edit Project</button><br><br><br>")
				$(function () {
					$("#edit-proj-" + item.id).on('click', function () {
						window.localStorage.removeItem('editId');
						window.localStorage.setItem('editId', JSON.stringify(item.id));
						window.location.href = "editpage.html";
					});
				});
			});
		},
		error: function () {
			alert("The browser could not access this user's projects");
		},
	});
});

// create new project
$(function () {
	$("#addproject").on('click', function() {
		window.location.href = "createpage.html";
	});
});
