#!/usr/bin/python3

from models import storage
from models.base_model import BaseModel
from models.user import User
from models.project import Project


if __name__ == '__main__':
    model = BaseModel(name="test")
    print(model)
    print(model.to_dict())

    user = User(name="Dennis", email="akinwonjowodennisco@gmail.com")
    project = Project(title="Coballo")

    print(user.to_dict())
    print(project.to_dict())
    user.save()
