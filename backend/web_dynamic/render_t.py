#!/usr/bin/python3

from flask import Flask, render_template, abort, request
from models import storage
from models.user import User
from models.project import Project
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/coballo/user', strict_slashes=False, methods=['POST'])
def myprojects():
    """This sets up the myproject template"""
    if not request.json:
        abort(400, "Not a json")
    if "id" not in request.json:
        abort(400, "Id not present")
    request_dict = request.get_json()
    all_proj = storage.all(Project).values()
    username = "My"
    for obj in storage.all(User).values():
        if obj.id == request_dict['id']:
            username = obj.name
    user_proj = []
    for item in all_proj:
        if item.id == request_dict['id']:
            user_proj.append(item)
    return render_template('myprojects.html',
                            projects=user_proj,
                            username=username)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
