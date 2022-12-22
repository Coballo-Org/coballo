#!/usr/bin/node

var user = JSON.parse(window.localStorage.getItem('presentUser'));

// search by project name
$(function () {
	var $search_key = $("#owner-name");

	$('#name-search').on('click', function() {
		var key_dict = {
			"owner": $search_key.val(),
		}
		$.ajax({
			type: 'GET',
			url: 'http://100.25.165.74:5005/coballo/projects/name/' + $key_dict.owner,
			contentType: 'application/json',
			dataType: 'json',
			success: function (projects) {
				$.each(projects, function (index, project) {
					$('#project-list').append('<h1>' + project.title + '</h1><p>' + project.description + '</p>');
				});
			}
		};
});
