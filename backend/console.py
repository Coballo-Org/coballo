#!/usr/bin/python3
"""This is a console to manage the operations on our objects"""

import cmd
from models.user import User
from models.project import Project


class Coballo(cmd.Cmd):
    """Class definition"""

    promt = '(coballo) '

    def do_quit(self):
        """Exits the console"""
        return True
