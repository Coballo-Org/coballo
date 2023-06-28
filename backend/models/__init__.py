#!/usr/bin/python3

from os import getenv
from models.engine.file_storage import FileStorage
from models.engine.db_storage import DBStorage
from os import getenv

if getenv('COBALLO_TYPE_STORAGE') == 'db':
    print("Db storage in use")
    storage = DBStorage()
else:
    print("File storage in use")
    storage = FileStorage()

storage.reload()
