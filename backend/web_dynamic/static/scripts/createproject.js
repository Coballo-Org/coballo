//create a new project

let user = window.localStorage.getItem('presentUser');
let langList = [];

// Search by language
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

// post the new project
$(function () {
	let user = JSON.parse(window.localStorage.getItem('presentUser'));
	var $title = $("#title");
	var $description = $("#description");
	var $readme = $("#readme");
	var $link = $("#link");

	$("#create").on('click', function () {
		var project = {
			"title": $title.val(),
			"language": langList,
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
				alert(proj.title + ' has been created successfully');
				window.location.href = 'myprojects.html';
			},
			error: function() {
				alert ("Your project could not be created, please try again");
			},
		});
	});
});
