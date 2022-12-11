#!/usr/bin/python3

from models.base_model import BaseModel, Base


class Project(BaseModel, Base):
    __tablename__ = 'projects'
    """This defines the Project object"""
    title = ""
    description = ""
    owner = ""
    past_contributors = ""
    status = ""
    close = ""
