#!/usr/bin/python3

from os import getenv
from models.engine.file_storage import FileStorage
from models.engine.db_storage import DBStorage

if getenv('COBALLO_STORAGE_TYPE') == 'db':
    storage = DBStorage()
else:
    storage = FileStorage()

storage.reload()
