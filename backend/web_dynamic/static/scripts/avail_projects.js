#!/usr/bin/node

var user = JSON.parse(window.localStorage.getItem('presentUser'));

$(function () {
        $('#logout').on("click", function() {
                window.localStorage.clear();
                window.location = 'http://100.25.165.74:5004/coballo';
        });
});

//Lists some available projects
$(function () {
	$.ajax({
		type: 'GET',
		url: 'http://100.25.165.74:5005/coballo/projects',
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function (projects) {
			$('#project-list').html("");
			$.each(projects, function(index, project) {
				$.ajax({
					type: 'GET',
					url: 'http://100.25.165.74:5005/coballo/users/' + project.owner_id,
					data: {},
					contentType: 'application/json',
					dataType: 'json',
					success: function (users) {
						$('#project-list').append('<h1>' + project.title + '</h1><p><em>created by: ' + users.first_name + ' ' + users.last_name + '</em></p><hr><p>' + project.description + '</p><br><br>');
					},
				});
			});
		},
		error: function () {
			alert("The available projects can not be loaded at this time");
		},
	});
});


// search by project name
$(function () {
	var $search_key = $("#owner-name");

	$('#name-search').on('click', function() {
		var key_dict = {
			"owner": $search_key.val(),
		}
		$.ajax({
			type: 'GET',
			url: 'http://100.25.165.74:5005/coballo/users/name/' + key_dict.owner,
			contentType: 'application/json',
			dataType: 'json',
			success: function (users) {
				$("#project-list").html("");
				$.each(users, function (index, user) {
					$.ajax({
						type: 'GET',
						url: 'http://100.25.165.74:5005/coballo/users/' + user.id + '/projects',
						contentType: 'application/json',
						dataType: 'json',
						success: function (projects) {
							$.each(projects, function(index, project) {
									$('#project-list').append('<h1>' + project.title + '</h1><p><em>created by: ' + user.first_name + ' ' + user.last_name + '</em></p><hr><p>' + project.description + '</p><br><br>');
							});
						},
						error: function() {
							alert("This user has no projects");
						},
					});
				});
			},
			error: function() {
				alert("No user matched this search");
			},
		});
	});
});

// Search by project title
$(function () {
	var $searchTitle = $("#project-name");

	$("#title-search").on('click', function () {
		$.ajax({
			type: 'GET',
			url: 'http://100.25.165.74:5005/coballo/projects/title/' + $searchTitle.val(),
			contentType: 'application/json',
			dataType: 'json',
			success: function (projects) {
				$("#project-list").html("");
				$.each(projects, function(index, project) {
					$.ajax({
						type: 'GET',
						url: 'http://100.25.165.74:5005/coballo/users/' + project.owner_id,
						contentType: 'application/json',
						dataType: 'json',
						success: function (projUser) {
							$('#project-list').append('<h1>' + project.title + '</h1><p><em>created by: ' + projUser.first_name + ' ' + projUser.last_name + '</em></p><hr><p>' + project.description + '</p><br><br>');
						},
						error: function () {
							alert("No user found for this project");
						},
					});
				});
			},
			error: function() {
				alert("No project title matched this search");
			},
		});
	});
});
 
// Search by language
$(function () {
	var checkList = document.getElementById('list1');
	checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
		if (checkList.classList.contains('visible'))
			checkList.classList.remove('visible');
		else
			checkList.classList.add('visible');
	}


	$.ajax({
		type: 'GET',
		url: 'http://100.25.165.74:5005/coballo/languages',
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function(languages) {
			$.each(languages, function(index, language) {
				$(".items").append(`<li><input type="checkbox" />` + language.name + `</li>`)
			});
		},
	});
});
