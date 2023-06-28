#!/usr/bin/node

var user = JSON.parse(window.localStorage.getItem('presentUser'));

$(function () {
        $('#logout').on("click", function() {
                window.localStorage.clear();
                window.location = 'http://localhost:5004/coballo';
        });
});

//Lists some available projects
$(function() {
	var url = '/projects'
	request.get(url)
	.then((projects) => {
		$('#project-list').html("");
		$.each(projects, function(index, project) {
			var url = '/users/' + project.owner_id;
			request.get(url)
			.then((user) => {
				$('#project-list').append('<h1>' + project.title + '</h1><p><em>created by: ' + user.first_name + ' ' +
										user.last_name + '</em></p><p><em>languages/framework: ' +
										project.language.join(', ') + '</em></p><hr><p>' + project.description + '</p><br><br>');
			}).catch((err) => {
				$('#project-list').html("<p>Error: Projects could not be loaded, please reload the page again</p>");
			})
		})
	}).catch((err) => {
		$('#project-list').html("<p>Error: Projects could not be loaded, please reload the page again</p>");
	})
});


// search by owner name
$(function () {
	var $search_key = $("#owner-name");

	$('#name-search').on('click', function() {
		var key_dict = {
			"owner": $search_key.val(),
		}
		var url = '/users/name/' + key_dict.owner
		request.get(url)
		.then((users) => {
			$("#project-list").html("");
			$.each(users, function (index, user) {
				var url = '/users/' + user.id + '/projects';
				request.get(url)
				.then((projects) => {
					$.each(projects, function(index, project) {
						$('#project-list').append('<h1>' + project.title + '</h1><p><em>created by: ' + user.first_name + ' ' + user.last_name + '</em></p><p><em>languages/framework: ' + project.language.join(', ') + '</em></p><hr><p>' + project.description + '</p><br><br>');
					});
				}).catch((err) => {
					$("#error-msg-A").html("This user has no projects!");
				})
			})
		}).catch((err) => {
			$("#error-msg-A").html("No user matched this search!");
		})
	});
});

// Search by project title
$(function () {
	var $searchTitle = $("#project-name");

	$("#title-search").on('click', function () {
		var key_dict = {
			"title": $searchTitle.val(),
		};
		var url = '/projects/title/' + key_dict.title;
		request.get(url)
		.then((projects) => {
			$("#project-list").html("");
			$.each(projects, function(index, project) {
				var url = '/users/' + project.owner_id
				request.get(url)
				.then((projUser) => {
					$('#project-list').append(`<h1>` + project.title + `</h1><p><em>created by: ` + projUser.first_name +
											` ` + projUser.last_name + `</em></p><p><em>languages/framework: ` +
											project.language.join(', ') + `</em></p><hr><p>` + project.description + `</p><br><br>`);
				}).catch((err) => {
					("#error-msg-B").html("No user found for this project!");
				})
			})
		}).catch((err) => {
			$("#error-msg-B").html("No project title matched this search!");
		})
	});
});

var langList = [];
// Load all languages for dropdown box
$(function () {
	request.get('/languages')
	.then((languages) => {
		$.each(languages, function(index, language) {
			$("#checkbox").append('<p id="checkbox"><label for="' + language.name + '">' +
									language.name + '</label> <input type="checkbox" name="' +
									language.name + '" id="' + language.id + '"></p>');
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
	}).catch((err) => {
		$('#error-msg-C').html("Langugaes could not be loaded, please try agin later.");
	})
});

var dict = {};
// search by language
$(function () {
	$("#lang-search").on('click', function(){
		request.get('/projects')
		.then((projects) => {
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
		}).catch((err) => {
			$('#error-msg-C').html("Could not load the search results, Please try again later");
		})

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
			request.get('/projects/' + item[0])
			.then((project) => {
				$('#project-list').html("");
				request.get('/users/' + project.owner_id)
				.then((users) => {
					$('#project-list').append('<h1>' + project.title + '</h1><p><em>created by: ' +
												users.first_name + ' ' + users.last_name +
												'</em></p><p><em>languages/framework: ' + project.language.join(', ') +
												'</em></p><hr><p>' + project.description + '</p><br><br>');
				}).catch((err) => {
					$('#error-msg-C').html("This project user was not found");
				})
			}).catch((Err) => {
				console.log(Err.toString())
				$('#error-msg-C').html("This project could not be loaded, please try again later");
			})
		});
	});
});

