#!/usr/bin/python3

from models.base_model import BaseModel, Base


class User(BaseModel, Base):
    """This defines the user object"""
    name = ""
    email = ""
    password = ""
    github_username = ""
