#!/usr/bin/python3
"""The entry point for the app"""

from flask import Flask, render_template
from models.user import User
from models.project import Project
from models import storage

app = Flask(__name__)


@app.teardown_appcontext
def teardown_db(exception):
    """This is called after each request to remove the current
    sqlalchemy session"""
    storage.close()


@app.route('/coballo', strict_slashes=False)
def coballo():
    """This sets up the templates"""
    users = storage.all(User).values()
    projects = storage.all(Project).values()
    return render_template('index.html',
                            users=users,
                            projects=projects)

    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
