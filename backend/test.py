#!/usr/bin/python3

from models import storage
from models.base_model import BaseModel
from models.user import User
from models.project import Project


def get_user_by_name(user_name):
    """This returns a list of all users whose first name or
    last name corresponds with the input"""
    users = []
    for key, obj in storage.all(User).items():
        if user_name.lower() == obj.first_name.lower() or user_name.lower() == obj.last_name.lower():
            users.append(obj.to_dict())
    if len(users) == 0:
        return("Error!")
    return users


def test_case(name):
    for key, obj in storage.all(User).items():
        if name.lower() == obj.first_name.lower() or name.lower() == obj.last_name.lower():
            print("true")
        else:
            print("false")

def case_test(str1, str2):
    if str1 in str2:
        print("true")
    else:
        print("false")

if __name__ == '__main__':
    case_test("sep", "joseph")
