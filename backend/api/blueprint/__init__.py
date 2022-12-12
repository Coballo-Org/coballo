#!/usr/bin/python3

from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/coballo')

from api.blueprint.projects import *
from api.blueprint.users import *
