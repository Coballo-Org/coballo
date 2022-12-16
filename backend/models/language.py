#!/usr/bin/python3
"""This defines the language in which projects are writen in"""

from models.base_model import BaseModel, Base


class Language(BaseModel, Base):
    """Entry point for the class"""
    __tablename__ = 'languages'
    def __init__(self, *args, **keargs):
        super().__init__(*args, **kwargs)

    name = ""
