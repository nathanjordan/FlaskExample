from flask import Flask, send_from_directory, request
from pymongo import MongoClient
from bson import json_util
import json

# Create a new Flask server
app = Flask(__name__)

# Enable debugging
app.debug = True

# Create a new MongoDB context
client = MongoClient('localhost', 27017)

# Load the FlaskExample database
flaskdb = client.flaskexample

@app.route('/', methods=['GET'])
def index():
    # Return the static index page
    return app.send_static_file('index.html')

@app.route('/users/<username>', methods=['GET', 'PUT', 'DELETE'])
def handleUserRequest(username):
    # Get the users collection
    usersdb = flaskdb.users
    # If it's a get request, return the requested user
    if request.method == 'GET':
        # Find the username in the mongo collection
        user = usersdb.find_one({'username': username})
        # Serialize it as JSON and return to the client
        return json.dumps(user)
    # If adding/updating a user
    if request.method == 'PUT':
        # Deserialize the json object into a dict
        user = json.loads(request.get_data())
        # Update the user with the new data, or insert if it doesn't exist (upsert)
        usersdb.update({'username': username}, user, upsert=True)
        return ''
    # If deleting a user
    if request.method == 'DELETE':
        # Remove the user from the database
        usersdb.remove({'username': username })
        return ''

@app.route('/users', methods=['GET'])
def getUsers():
    # Get the users collection
    usersdb = flaskdb.users
    # Load all users in the DB
    users = list(usersdb.find())
    # Send them back to the client as a json string
    return json_util.dumps(users)

# Serves static resources like css, js, images, etc.
@app.route('/assets/<path:resource>')
def serveStaticResource(resource):
    # Return the static file
    return send_from_directory('static/assets/', resource)

if __name__ == "__main__":
    app.run()
