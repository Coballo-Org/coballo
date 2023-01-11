#!/usr/bin/python3
"""This defines the language in which projects are writen in"""

from models.base_model import BaseModel, Base
from os import getenv
from sqlalchemy import Column, String

class Language(BaseModel, Base):
    """Entry point for the class"""
    if getenv('COBALLO_TYPE_STORAGE') == 'db':
        __tablename__ = 'languages'
        name = Column(String(128), nullable=False)
    else:
        name = ""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

