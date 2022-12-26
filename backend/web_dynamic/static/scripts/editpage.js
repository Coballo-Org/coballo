#!/usr/bin/node

const projectId = JSON.parse(window.localStorage.getItem("editId"))
$(function () {
	$.ajax({
		type: 'GET',
		url: 'http://100.25.165.74:5005/coballo/projects/' + projectId,
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function (project) {
			$("#title").val(project.title);
			$("#languages").val(project.language);
			$("#description").val(project.description);
			$("#readme").val(project.readme);
			$("#link").val(project.link);
		},
		error: function (){
			alert("Could not load this project, please try again");
		},
	});
	$(function () {
		$("#edit").on('click', function () {
			var $title = $("#title");
			var $language = $("#languages");
			var $description = $("#description");
			var $readme = $("#readme");
			var $link = $("#link");

			const project = {
				"title": $title.val(),
				"language": $language.val(),
				"description": $description.val(),
				"readme": $readme.val(),
				"link": $link.val(),
			};

			$.ajax({
				type: 'PUT',
				url: 'http://100.25.165.74:5005/coballo/projects/' + projectId,
				data: JSON.stringify(project),
				contentType: 'application/json',
				dataType: 'json',
				success: function () {
					alert("Your project has been updated successfully");
					window.location.href = 'myprojects.html';
				},
				error: function () {
					alert("Your project could not be updated, please try again");
				},
			});
			window.location.href = 'myprojects.html';
		});
	});
});
