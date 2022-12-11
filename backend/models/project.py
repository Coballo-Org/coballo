#!/usr/bin/python3

from models.base_model import BaseModel


class Project(BaseModel):
    """This defines the Project object"""
    title = ""
    description = ""
    owner = ""
    past_contributors = ""
    status = ""
    close = ""
