from flask import Flask, send_from_directory, request, render_template
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

# Routes are how Flask determines what the browser gets sent back to it.
# In this case, when the user requests '/' from the webserver, the function
# index will be executed. The value returned from the function is what Flask
# sends back to the web browser. For '/' (the index of the site), I have Flask
# render the index template (look in templates/index.html for more info on this)
# and returns the resulting HTML to the browser.
@app.route('/', methods=['GET'])
def index():
    applicationName = 'FlaskExample'
    # Render the index template, and inject applicationName
    # into the template as appName
    return render_template('index.html', appName=applicationName)

# This route is for the user resource. The methods allow you to
# GET a user resource, create/update it (PUT), or delete (DELETE) it.
# The browser interacts with these interfaces via AJAX calls.
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

# This route returns all the users in the database
@app.route('/users', methods=['GET'])
def getUsers():
    # Get the users collection
    usersdb = flaskdb.users
    # Load all users in the DB
    users = list(usersdb.find())
    # Send them back to the client as a json string
    return json_util.dumps(users)

# Serves static resources like css, js, images, etc.
@app.route('/js/<path:resource>')
def serveStaticResource(resource):
    # Return the static file
    return send_from_directory('static/js/', resource)

# If we're running this script directly (eg. 'python server.py')
# run the Flask application to start accepting connections
if __name__ == "__main__":
    app.run('localhost', 5000)
