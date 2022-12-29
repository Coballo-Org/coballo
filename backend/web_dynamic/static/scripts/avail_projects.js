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
					success: function (user) {
						$('#project-list').append('<h1>' + project.title + '</h1><p><em>created by: ' + user.first_name + ' ' + user.last_name + '</em></p><p><em>languages/framework: ' + project.language.join(', ') + '</em></p><hr><p>' + project.description + '</p><br><br>');
					},
					error: function() {
						$('#project-list').html("<p>Error: Projects could not be loaded, please reload the page again</p>");
					},
				});
			});
		},
		error: function () {
			$('#project-list').html("<p>Error: Projects could not be loaded, please reload the page again</p>")
		},
	});
});


// search by owner name
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
								$('#project-list').append('<h1>' + project.title + '</h1><p><em>created by: ' + user.first_name + ' ' + user.last_name + '</em></p><p><em>languages/framework: ' + project.language.join(', ') + '</em></p><hr><p>' + project.description + '</p><br><br>');
							});
						},
						error: function() {
							$("#error-msg-A").html("This user has no projects!");
						},
					});
				});
			},
			error: function() {
				$("#error-msg-A").html("No user matched this search!");
			},
		});
	});
});

// Search by project title
$(function () {
	var $searchTitle = $("#project-name");

	$("#title-search").on('click', function () {
		var key_dict = {
			"title": $searchTitle.val(),
		};
		$.ajax({
			type: 'GET',
			url: 'http://100.25.165.74:5005/coballo/projects/title/' + key_dict.title,
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
							$('#project-list').append('<h1>' + project.title + '</h1><p><em>created by: ' + projUser.first_name + ' ' + projUser.last_name + '</em></p><p><em>languages/framework: ' + project.language.join(', ') + '</em></p><hr><p>' + project.description + '</p><br><br>');
						},
						error: function () {
							("#error-msg-B").html("No user found for this project!");
						},
					});
				});
			},
			error: function() {
				$("#error-msg-B").html("No project title matched this search!");
			},
		});
	});
});

var langList = [];
// Load all languages for dropdown box
$(function () {
	$.ajax({
		type: 'GET',
		url: 'http://100.25.165.74:5005/coballo/languages',
		data: {},
		contentType: 'application/json',
		dataType: 'json',
		success: function(languages) {
			$.each(languages, function(index, language) {
				$("#checkbox").append('<p id="checkbox"><label for="' + language.name + '">' + language.name + '</label> <input type="checkbox" name="' + language.name + '" id="' + language.id + '"></p>');
				$("#" + language.id).on('click', function() {
					if (langList.includes(language.name)) {
						for (var i = 0; i < langList.length; i++) {
							if (langList[i] === language.name) {
								langList.splice(i, 1);
							}
						}
					} else {
						langList.push(language.name)
					};
					$("#dropLabel").val(langList.join(', '));
				});
			});
		},
		error: function() {
			$('#error-msg-C').html("Langugaes could not be loaded, please try agin later.");
		},
	});
});

var dict = {};
// search by language
$(function () {
	$("#lang-search").on('click', function(){
		$.ajax({
			type: "GET",
			url: "http://100.25.165.74:5005/coballo/projects",
			contentType: 'application/json',
			dataType: 'json',
			success: function(projects) {
				$.each(projects, function(index, project) {
					dict[project.id] = 0;
					$.each(project.language, function(index2, lang) {
						$.each(langList, function(index3, item) {
							if (lang === item) {
								dict[project.id] = dict[project.id] + 1;
							}
						});
					});
				});
			},
			error: function(){
				$('#error-msg-C').html("Could not load the search results, Please try again later");
			},
		});

		for (let k in dict) {
			if (dict[k] === 0) {
				delete dict[k];
			}
		};
		// sort the dictionary dict by values
		var items = Object.keys(dict).map(function(key) {
			return [key, dict[key]];
		});

		items.sort(function(first, second) {
			return second[1] - first[1];
		});

		// Load the corresponding projects
		$.each(items, function(index, item) {
			console.log(item[0]);
			$.ajax({
				type: 'GET',
				url: 'http://100.25.165.74:5005/coballo/projects/' + item[0],
				data: {},
				contenttype: 'application/json',
				dataType: 'json',
				success: function(project) {
					$('#project-list').html("");
					console.log(project)
					$.ajax({
						type: 'GET',
						url: 'http://100.25.165.74:5005/coballo/users/' + project.owner_id,
						data: {},
						contentType: 'application/json',
						dataType: 'json',
						success: function (users) {
							$('#project-list').append('<h1>' + project.title + '</h1><p><em>created by: ' + users.first_name + ' ' + users.last_name + '</em></p><p><em>languages/framework: ' + project.language.join(', ') + '</em></p><hr><p>' + project.description + '</p><br><br>');
						},
						error: function () {
							$('#error-msg-C').html("This project user was not found");
						},
					});
				},
				error: function () {
					$('#error-msg-C').html("This project could not be loaded, please try again later");
				},
			});
		});
	});
});

