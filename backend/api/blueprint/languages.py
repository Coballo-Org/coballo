#!/usr/bin/python3

from models.language import Language
from models import storage
from api.blueprint import app_views
from flask import abort, jsonify

@app_views.route('/languages', strict_slashes=False, methods=['GET'])
def get_language():
    """This returns the list of all languages in storage"""
    lang = []
    for key, obj in storage.all(Language).items():
        lang.append(obj.to_dict())

    return jsonify(lang)
