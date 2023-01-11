#!/usr/bin/python3

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from os import getenv


class Project(BaseModel, Base):
    """This defines the Project object"""
    if getenv('COBALLO_TYPE_STORAGE') == 'db':
        __tablename__ = 'projects'
        title = Column(String(128), nullable=False)
        description = Column(String(1024), nullable=False)
        readme = Column(String(1024), nullable = True)
        link = Column(String(128), nullable=True)
        owner_id = Column(ForeignKey('users.id'))
    else:
        title = ""
        description = ""
        owner = ""
        past_contributors = ""
        status = ""
        close = ""

    def __init__(self, *args, **kwargs):
        """initializes project"""
        super().__init__(*args, **kwargs)
