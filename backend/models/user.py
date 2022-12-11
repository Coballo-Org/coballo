#!/usr/bin/python3

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String


class User(BaseModel, Base):
    """This defines the user object"""
    if 'storage_t' == 'db':
        __tablename__ = 'users'
        name = Column(String(128), nullable=False)
        email = Column(String(128), nullable=False)
        password = Column(String(128), nullable=False)
        github_username = Column(String(60), nullable=False)
    else:
        name = ""
        email = ""
        password = ""
        github_username = ""
