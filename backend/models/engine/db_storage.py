#!/usr/bin/python3
"""This is the db storage class for AirBnB"""
from os import getenv
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import create_engine
from models.base_model import Base


class DBStorage():
    """
    Database Engine for AirBnB project
    """
    __engine = None
    __session = None

    def __init__(self):
        """Init method"""
        self.__engine = create_engine('mysql+mysqldb://coballo_dev:coballo_dev_pwd@localhost:3306/coballo_dev_db',
                                      pool_pre_ping=True)
        Base.metadata.drop_all(bind=self.__engine)

    def reload(self):
        """Create the current database session (self.__session) from
        the engine (self.__engine) by using a sessionmaker"""
        from models.user import User
        from models.project import Project

        Base.metadata.create_all(self.__engine)
        self.__session = sessionmaker(bind=self.__engine,
                                      expire_on_commit=False)
        Session = scoped_session(self.__session)
        self.__session = Session()

    def new(self, obj):
        """Add the object to the current
        database session (self.__session)"""
        self.__session.add(obj)

    def save(self):
        """Commit all changes of the current
        database session (self.__session)"""
        self.__session.commit()

    def delete(self, obj=None):
        """Delete from the current database session obj if not None"""
        if obj:
            self.__session.delete(obj)

    def close(self):
        """Removes the session"""
        self.__session.close()
