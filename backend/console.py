#!/usr/bin/python3
"""This is a console to manage the operations on our objects"""

import cmd
from models.user import User
from models.project import Project
from models import storage
from datetime import datetime

classes = {'User': User, 'Project': Project}


class Coballo(cmd.Cmd):
    """Class definition"""

    prompt = '(coballo) '

    def do_quit(self, args):
        """Exits the console"""
        return True

    def do_create(self, args):
        """This creates a new object and adds it to storage
        usage: create <className>"""
        if not args:
            print("* Missing class name *")
            return False
        arg = args.split()
        if arg[0] not in classes:
            print("* Invalid class name *")
            return False
        pr_dict = {}
        for item in arg[1:]:
            if '=' in item:
                key_pair = item.split('=')
                pr_dict[key_pair[0]] = key_pair[1]
        print(pr_dict)
        prototype = classes[arg[0]](**pr_dict)
        print(prototype.id)
        prototype.save()

    def do_update(self, args):
        """This updates the attributes of an object
        usage: update <className> <classId> <key> <value>"""
        if not args:
            print("* Enter a class name *")
            return False
        arg = args.split()
        if arg[0] not in classes:
            print("* class doesn't exist *")
            return False
        if len(arg) < 2:
            print("* Enter the class id *")
            return False
        elif len(arg) < 3:
            print("* Enter a the attribute name *")
            return False
        elif len(arg) < 4:
            print("* Enter a attribute value *")
            return False
        search_key = arg[0] + '.' + arg[1]
        search_class = classes[arg[0]]
        if search_key in storage.all():
            for k, obj in storage.all().items():
                if k == search_key:
                    setattr(obj, arg[2], arg[3])
                    obj.updated_at = datetime.now().isoformat()
                    obj.save()
        else:
            print("* Instance not found *")
            return False


    def do_all(self, args):
        """This list all the instance of the class given as argument
        or all instances if no class is given
        usage: all <className>"""
        all_objs = []
        if not args:
            for k, obj in storage.all().items():
                all_objs.append(obj.to_dict())
        else:
            arg = args.split()
            for k, obj in storage.all().items():
                if arg[0] in k.split('.'):
                    all_objs.append(obj.to_dict())
        for item in all_objs:
            print(item)


    def do_destroy(self, args):
        """This removes an object from storage
        usage: destroy <className> <classId>"""
        if not args:
            print("* Enter a class name *")
            return False
        arg = args.split()
        if len(args) < 2:
            print("* Enter a class id *")
            return False
        search_key = arg[0] + '.' + arg[1]
        if search_key in storage.all():
            for key, obj in storage.all().items():
                if key == search_key:
                    del storage.all()[search_key]
                    storage.save()
                    return False
        else:
            print("* Instance not found *")
            return False

    def do_close(self, args=None):
        """Calls the close function of storage"""
        storage.close()


if __name__ == '__main__':
    Coballo().cmdloop()
