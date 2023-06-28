#!/usr/bin/python3
"""The entry point for the app"""

from flask import Flask, render_template

app = Flask(__name__)


@app.route('/', strict_slashes=False)
def coballo():
    """This sets up the index template"""
    return render_template('index.html')



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004, debug=True)
