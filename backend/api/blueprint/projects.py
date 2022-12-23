#!/usr/bin/python3

from datetime import datetime
from api.blueprint import app_views
from flask import abort, jsonify, make_response, request
from models import storage
from models.user import User
from models.project import Project

@app_views.route('/projects', strict_slashes=False, methods=['GET'])
def all_projects():
    """This returns a list of all projects in storage"""
    all_pr = []
    for k, obj in storage.all(Project).items():
        all_pr.append(obj.to_dict())

    sorted_list = sorted(all_pr, key=lambda d: d['title'])
    return jsonify(sorted_list)

@app_views.route('/projects/<project_id>', strict_slashes=False, methods=['GET'])
def project(project_id):
    """This returns a specific project of id"""
    for k, obj in storage.all(Project).items():
        if obj.id == project_id:
            return jsonify(obj.to_dict())
    abort(404, "No Project found")


@app_views.route('/users/<owner_id>/projects', strict_slashes=False,
                 methods=['GET'])
def user_project(owner_id):
    """This returns a list of projects under a user"""
    user_p = []
    for k, obj in storage.all(Project).items():
        if obj.owner_id == owner_id:
            user_p.append(obj.to_dict())

    if len(user_p) == 0:
        abort(404, "No project found")
    sorted_list = sorted(user_p, key=lambda d: d['title'])
    return jsonify(sorted_list)


@app_views.route('/projects', strict_slashes=False, methods=['POST'])
def add_projects():
    """This creates a new project instance and adds it to memory"""
    if not request.json:
        abort(404, "Not a JSON")
    if 'title' not in request.json:
        abort(400, 'Enter a project title')
    if 'owner_id' not in request.json:
        abort(400, 'Enter a project owner')
    if 'description' not in request.json:
        abort(400, 'Enter a project description')

    request_dict = request.get_json()
    model = Project(**request_dict)
    storage.new(model)
    storage.save()
    return jsonify(model.to_dict()), 200


@app_views.route('/projects/<project_id>', strict_slashes=False, methods=['PUT'])
def update_project(project_id):
    """This updates the attributes of a project instance"""
    if not request.json:
        abort(404, "Not a JSON")
    request_dict = request.get_json()
    for key, obj in storage.all(Project).items():
        if obj.id == project_id:
            for k, v in request_dict.items():
                setattr(obj, k, v)
            obj.save()
            return jsonify(obj.to_dict())
    abort(404, "No instance found")


@app_views.route('/projects/<project_id>', strict_slashes=False, methods=['DELETE'])
def delete_project(project_id):
    """This removes a project instance from the storage"""
    search_key = 'Project.' + project_id
    for key, obj in storage.all(Project).items():
        if key == search_key:
            storage.delete(obj)
            return {}
