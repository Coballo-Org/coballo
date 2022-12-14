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
                if cls.__name__ in k:
                    new_dict[k] = v
            return new_dict

    def new(self, obj):
        """This adds a new object to the __objects dict"""
        key = obj.__class__.__name__ + '.' + obj.id
        type(self).__objects[key] = obj


    def save(self):
        """This saves the object to the storage"""
        my_dict = {}
        for k, obj in type(self).__objects.items():
            my_dict[k] = obj.to_dict()
        with open(type(self).__file_path, 'w', encoding='utf-8') as f:
            json.dump(my_dict, f)


    def reload(self):
        """This populate the __objects dict with existing data"""
        try:
            with open(type(self).__file_path) as f:
                content = json.load(f)
        except Exception:
            pass
        else:
            for k, item in content.items():
                if 'User' in k.split('.'):
                    from models.user import User
                    type(self).__objects[k] = User(**item)
                elif 'Project' in k.split('.'):
                    from models.project import Project
                    type(self).__objects[k] = Project(**item)


    def delete(self, obj):
        """This removes an object from the storage"""
        search_key = obj.__class__.__name__ + '.' + obj.id
        for key, val in self.__objects.items():
            if key == search_key:
                del self.__objects[key]
                self.save()
                return


    def get(self, cls, ids):
        """This returns an object from storage"""
        search_key = cls + '.' + ids
        for key, val in self.all().items():
            if key == search_key:
                return val


    def close(self):
        self.reload()
