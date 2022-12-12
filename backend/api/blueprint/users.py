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


@app_views.route('/users', strict_slashes=False, methods=['POST'])
def create_user():
