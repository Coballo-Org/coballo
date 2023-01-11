# COBALLO PROJECT

## INTRODUCTION

This is a platform for developers to create projects and find other developers
who are interested in collaborating or contributing on the project.
User can also list their abandoned developer projects and have other developers
pick them up and continue working on them. 
Users can vies available projects and decide to collaborate with the owners on 
completing them. Users who are searching for partners to complete their projects
can also list their projects and it will be available for others to view.
It is a periquisite for completing the
software engineering program at Holbeton College through the ALX initiative.

Project Type: Full-stack </br>
Front-end: HTML, CSS, Javascript </br>
Back-end: Python, MySQL </br>

## KNOWN BUGS

There are currently no known bugs.

## INSTALLATION

First install all the neccessary packages, then clone this repository to your local device.
Navigate to the backend directory and run the following command:</br>
$ tmux new-session -d 'gunicorn --bind 0.0.0.0:5000 web_dynamic.coballo:app'</br>
This fetches data from filestorage. To use the mysql database for storage run the following command:</br>
$ tmux new-session -d 'COBALLO_TYPE_STORAGE=db COBALLO_DEV=coballo_dev COBALLO_DEV_PWD=coballo_dev_pwd COBALLO_HOST=localhost COBALLO_DEV_DB=coballo_dev_db guncorn --bind 0.0.0.0:5000 web_dynamic.coballo:app'</br>
Then start the APIs with the following command:</br>
$ tmux new-session -d 'gunicorn --bind 0.0.0.0:5001 api.app:app'</br>
You can then access the pages from your prefferred web browser on the foolowing address</br>
   http://127.0.0.1:5000/coballo</br>

## USAGE

On the homepage is the signup/login form for new and existing users respectively.
Upon signup, all the available projects from other users of the platform are listed
and you can click on any of the project to request collaboration with the owner. Also
you can search for projects of your choice either by owner's name, project name or 
your prefferred languages. All of which will load the corresponding projects details.
In the myproject page, A list of all the projects owned by you will be displayed, 
And the details of each one will also be displayed. Three buttons are provided at the
bottom of each project detail: 'Go to code' which is a link to the project repo on github,
'Edit Project' which leads to the edit page where users can edit the details of the project
and the 'Delete Project' button which well...you guessed right, It deletes the project. Also
a button is available at the right for laptop users or at the bottom of the page for mobile 
phone users which is the create Project button, It is used to create a new project.

## AUTHORS

Akinwonjowo Dennis [Github](https://github.com/Dennisco12) / [LinkedIn](https://linkedin.com/dennis-akinwonjowo)</br>
Benjamin Eruvieru [Github](https://github.com/benjamineruvieru)</br>
Nnaemeka Joseph [Github](https://github.com/nnaemekaxi)</br>
