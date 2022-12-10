#!/usr/bin/python3

from models.engine.file_storage import FileStorage
from models.engine.db_storage import DBStorage

storage = FileStorage()
storage.reload()
