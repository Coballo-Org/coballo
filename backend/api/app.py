#!/usr/bin/python3

from api.blueprint import app_views
from flask import Flask, jsonify, make_response
from flask_cors import CORS
from models import storage

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.register_blueprint(app_views)

@app.teardown_appcontext
def close(exception):
    storage.close()

@app.errorhandler(404)
def errorhandler(error):
    return make_response(jsonify({'error': "Not found"}), 404)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005)
