#!/usr/bin/python3

from flask import jsonify, abort, request
from api.blueprint import app_views
from models.user import User
from models.project import Project
from models import storage


@app_views.route('/users', strict_slashes=False, methods=['GET'])
def all_users():
    """This returns a list of all user instances in storage"""
    user_list = []
    for k, obj in storage.all(User).items():
        user_list.append(obj.to_dict())
    return jsonify(user_list)

@app_views.route('/users/<user_id>', strict_slashes=False, methods=['GET'])
def get_user(user_id):
    """This returns a user by id"""
    for key, obj in storage.all(User).items():
        if obj.id == user_id:
            return jsonify(obj.to_dict())
    abort(404, "User not found")


@app_views.route('/users/<str:email>/<str:pword>', strict_slashes=False,
                methods=['GET'])
def get_user_by_email_pword(email, pword):
    """This searches the storage for an email and a password and returns
    the corresponding user"""
    if not request.json:
        abort(400, "Not a json")
    if "email" not in request.json:
        abort(400, "Add an email")
    if "password" not in request.json:
        abort(400, "Add a password")
    for key, obj in storage.all(User).items():
        if obj.email and obj.email == email:
            if obj.password and obj.password == pword:
                return jsonify(obj.to_dict())
    abort(404, "User not found")


@app_views.route('/users', strict_slashes=False, methods=['POST'])
def create_user():
    """This creates a new User object and adds it to storage"""
    if not request.json:
        abort(400, "Not a JSON")
    if 'email' not in request.json:
        abort(400, "Add an email")
    if 'password' not in request.json:
        abort(400, "Add a password")
    request_dict = request.get_json()
    model = User(**request_dict)
    storage.new(model)
    storage.save()
    return jsonify(model.to_dict()), 201


@app_views.route('/users/<user_id>', strict_slashes=False, methods=['PUT'])
def update_user(user_id):
    """This updates the attributes of a User"""
    if not request.json:
        abort(400, "Not a JSON")
    request_dict = request.get_json()
    search_key = 'User.' + user_id
    for key, obj in storage.all(User).items():
        if key == search_key:
            for k, v in request_dict.items():
                if k not in ('created_at', 'updated_at', 'id', 'email'):
                    setattr(obj, k, v)
                    obj.save()
            storage.save()
            return jsonify(obj.to_dict())
    abort(404, "User not found")


@app_views.route('/users/<user_id>', strict_slashes=False, methods=['DELETE'])
def delete_user(user_id):
    """This deletes a User from storage"""
    search_key = 'User.' + user_id
    for key, obj in storage.all(User).items():
        if key == search_key:
            storage.delete(obj)
            return {}
    abort(404, "No User found")
