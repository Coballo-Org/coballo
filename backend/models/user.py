#!/usr/bin/python3

from models.base_model import BaseModel


class User(BaseModel):
    """This defines the user object"""
    name = ""
    email = ""
    password = ""
    github_username = ""
