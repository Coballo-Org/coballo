#!/usr/bin/node

// get the current user details
let user = JSON.parse(window.localStorage.getItem('presentUser'));

title = document.getElementById("titler")
title.append( user.name + " Workspace" );

$(function () {
	$('#logout').on("click", function() {
		window.localStorage.clear();
		window.location.href = 'index.html';
	});
});

// populate the page with the project details
$(function () {
	repo = document.getElementById("project-repos");
	request.get('/users/' + user.id + '/projects')
	.then((projects) => {
		$.each(projects, function (index, item) {
			$("#project-repos").append('<li><a href="#' + item.id + '">' + item.title + '</a></li>')
			$("#repo-info").append("<br><h1 id='" + item.id + "'>Project Title:<span>" + item.title + "</span></h1><h6><span>Description:</span>" + item.description + "</h6><h6><span>Languages:</span>" + item.language.join(', ') + "</h6><p>README:</p><i>" + item.readme + "</i><br><br><button class='go-to-co' id='go-to-code-" + item.id + "'>Go to Code</button><button class='edit-project' id='edit-proj-" + item.id + "'>Edit Project</button><button class='delete-project' id='delete-proj-" + item.id + "'> Delete Project</button><br><br><br>")
			$(function () {
				$("#go-to-code-" + item.id).on('click', function () {
					window.location = item.link;
				});
			});
			$(function () {
				$("#edit-proj-" + item.id).on('click', function () {
					window.localStorage.removeItem('editId');
					window.localStorage.setItem('editId', JSON.stringify(item.id));
					window.location.href = "editpage.html";
				});
			});
			$(function () {
				$("#delete-proj-" + item.id).on('click', function () {
					request.delete('/projects/' + item.id)
					.then(() => {
						alert("Your project has been deleted succesfully")
						location.reload()
					}).catch(() => {
						alert("An error has occur, and your project could not be deleted");
						location.reload();
					})
				});
			});
		});
	}).catch(() => {
		alert("Welcome, Do you want to create your first project now?")
	})
});

// create new project
$(function () {
	$("#addproject").on('click', function() {
		window.location.href = "createpage.html";
	});
});
