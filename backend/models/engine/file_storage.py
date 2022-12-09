#!/usr/bin/python3
"""This handles the storage activities by using a file as the storage means"""

import json


class FileStorage:
    """This is the class definition"""
    __file_path = 'coballo.json'
    __objects = {}

    def all(self, cls=None):
        """This returns a dict of all objects in the storage"""
        if cls is None:
            return type(self).__objects
        else:
            new_dict = {}
            for k, v in type(self).__objects.items():
                if cls in k.split('.'):
                    new_dict[k] = v
            return new_dict

    def new(self, obj):
        """This adds a new object to the __objects dict"""
        key = obj.__class__.__name__ + '.' + obj.id
        type(self).__objects[key] = obj


    def save(self):
        """This saves the object to the storage"""
        my_list = []
        for k, obj in type(self).__objects.items():
            my_dict = {}
            my_dict[k] = obj.to_dict()
            my_list.append(my_dict)
        with open(type(self).__file_path, 'w', encoding='utf-8') as f:
            json.dump(my_list, f)


    def reload(self):
        """This populate the __objects dict with existing data"""
        try:
            with open(type(self).__file_path) as f:
                content = json.load(f)
            for item in content:
                for k, dic in item.items():
                    if 'User' in k.split('.'):
                        from models.user import User
                        prototype = User(**dic)
                    elif 'Project' in k.split('.'):
                        from models.project import Project
                        prototype = Project(**dic)
                    type(self).__objects[k] = prototype
        except Exception as e:
            print(e)
            pass
