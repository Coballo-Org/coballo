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
			alert("Could not update this project, please try again");
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
				"title": 
});
