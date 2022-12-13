#!/usr/bin/python3

"""This serves as the class which other objects inherit from"""

from sqlalchemy.ext.declarative import declarative_base
import uuid
from datetime import datetime
import models
from sqlalchemy import String, DateTime, Column
time = "%Y-%m-%dT%H:%M:%S.%f"

Base = declarative_base()


class BaseModel:
    """The base class"""

    id = Column(String(60), unique=True, nullable=False,
                primary_key=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow())
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow())

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
        models.storage.new(self)
        models.storage.save()

    def delete(self):
        """This deletes an instance from the storage"""
        from models import storage
        storage.delete(self)

    def update(self, new_dict):
        """This updates the attribute of the object"""
        for k, v in new_dict.items:
            setattr(self, k, v)
            self.save()
