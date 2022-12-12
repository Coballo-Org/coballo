#!/usr/bin/python3

from models.base_model import BaseModel, Base


class Project(BaseModel, Base):
    """This defines the Project object"""
    __tablename__ = 'projects'
    title = ""
    description = ""
    owner = ""
    past_contributors = ""
    status = ""
    close = ""
