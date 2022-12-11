#!/usr/bin/python3

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String


class User(BaseModel):
    """This defines the user object"""
    name = ""
    email = ""
    password = ""
    github_username = ""
