#!/usr/bin/python3

"""This serves as the class which other objects inherit from"""

from sqlalchemy.ext.declarative import declarative_base
import uuid
from datetime import datetime
from models import storage
time = "%Y-%m-%dT%H:%M:%S.%f"

Base = declarative_base()


class BaseModel:
    """The base class"""

    def __init__(self, *args, **kwargs):
        """class initaialization"""
        if kwargs:
            if 'id' not in kwargs:
                self.id = str(uuid.uuid4())
            if 'created_at' not in kwargs:
                self.created_at = datetime.now()
            if 'updated_at' not in kwargs:
                self.updated_at = datetime.now()
            for k, v in kwargs.items():
                if k != '__class__':
                    setattr(self, k, v)
        else:
            self.id = str(uuid.uuid4())
            self.created_at = datetime.now()
            self.updated_at = datetime.now()

    def __str__(self):
        """This is called when the object is to be printed"""
        return "[{}] ({}) {}".format(self.__class__.__name__, self.id, self.__dict__)

    def to_dict(self):
        """This returns a dict of all the attributes of the object"""
        dictionary = self.__dict__.copy()
        dictionary['__class__'] = self.__class__.__name__
        try:
            dictionary['created_at'] = self.created_at.isoformat()
            dictionary['updated_at'] = self.updated_at.isoformat()
        except Exception:
            pass
        return (dictionary)

    def save(self):
        """This saves an instance of the current oobject into storage"""
        self.updated_at = datetime.now()
        storage.new(self)
        storage.save()


    def delete(self):
        """This deletes an instance from the storage"""
        from models import storage
        storage.delete(self)
