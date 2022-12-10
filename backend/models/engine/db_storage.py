#!/usr/bin/python3
"""This is the db storage class for AirBnB"""
from os import getenv
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import create_engine


class DBStorage():
    """
    Database Engine for AirBnB project
    """
    __engine = None
    __session = None

    def __init__(self):
        """Init method"""
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'
                                      .format(getenv('COBALLO_MYSQL_USER'),
                                              getenv('COBALLO_MYSQL_PWD'),
                                              getenv('COBALLO_MYSQL_HOST'),
                                              getenv('COBALLO_MYSQL_DB')),
                                      pool_pre_ping=True)
        self.create_session()

    def create_session(self):
        """Create the current database session (self.__session) from
        the engine (self.__engine) by using a sessionmaker"""
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
