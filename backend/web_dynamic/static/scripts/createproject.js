//create a new project

let user = window.localStorage.getItem('presentUser');
$(function () {
	let user = JSON.parse(window.localStorage.getItem('presentUser'));
	var $title = $("#title");
	var $language = $("#languages");
	var $description = $("#description");
	var $readme = $("#readme");
	var $link = $("#link");

	$("#create").on('click', function () {
		var project = {
			"title": $title.val(),
			"language": $language.val(),
			"description": $description.val(),
			"readme": $readme.val(),
			"link": $link.val(),
			"owner_id": user.id,
		}
		$.ajax({
			type: 'POST',
			url: 'http://100.25.165.74:5005/coballo/projects',
			data: JSON.stringify(project),
			dataType: 'json',
			contentType: 'application/json',
			success: function(proj) {
				alert(proj.title + 'has been created successfully');
				window.location.href = 'myprojects.html';
			},
			error: function() {
				alert ("Your project could not be created, please try again");
			},
		});
	});
});
