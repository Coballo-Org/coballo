#!/usr/bin/python3

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from os import getenv


class User(BaseModel, Base):
    """This defines the user object"""
    if getenv('COBALLO_TYPE_STORAGE') == 'db':
        __tablename__ = 'users'
        first_name = Column(String(128), nullable=True)
        last_name = Column(String(128), nullable=True)
        email = Column(String(128), nullable=False)
        password = Column(String(60), nullable=False)
        github_username = Column(String(128), nullable=True)
    else:
        first_name = ""
        last_name = ""
        email = ""
        password = ""
        github_username = ""

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)
