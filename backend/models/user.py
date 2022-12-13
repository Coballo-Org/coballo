#!/usr/bin/python3

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String


class User(BaseModel, Base):
    __tablename__ = 'users'
    """This defines the user object"""
    name = ""
    email = ""
    password = ""
    github_username = ""

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)
