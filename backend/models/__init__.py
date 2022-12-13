#!/usr/bin/python3

from os import getenv
from models.engine.file_storage import FileStorage
from models.engine.db_storage import DBStorage
storage = DBStorage()

storage.reload()
