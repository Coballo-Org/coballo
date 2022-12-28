#!/usr/bin/node

var langList = [];

// Select the preferred language
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
        });
});

// load the project details into the boxes
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
