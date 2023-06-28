#!/usr/bin/node

var langList = [];

// Select the preferred language
$(function () {
	request.get('/languages')
	.then((languages) => {
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
	})
});

// load the project details into the boxes
const projectId = JSON.parse(window.localStorage.getItem("editId"))
$(function () {
	request.get('/projects/' + projectId)
	.then((project) => {
		$("#title").val(project.title);
		$("#dropLabel").val(project.language);
		$("#description").val(project.description);
		$("#readme").val(project.readme);
		$("#link").val(project.link);
	}).catch((err) => {
		alert("Could not load this project, please try again");
	})
	// Upload the project
	$(function () {
		$("#edit").on('click', function () {
			var $title = $("#title");
			var $language = langList;
			var $description = $("#description");
			var $readme = $("#readme");
			var $link = $("#link");

			const project = {
				"title": $title.val(),
				"language": $language,
				"description": $description.val(),
				"readme": $readme.val(),
				"link": $link.val(),
			};

			request.put('/projects/' + projectId)
			.then(() => {
				alert("Your project has been updated successfully");
				window.location.href = 'myprojects.html';
			}).catch(() => {
				alert("Your project could not be updated, please try again");
			})
		});
	});
});
