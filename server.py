from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    with open('index.html').read() as html:
        return html

@app.route('/users/:userid')
def handleUsers():
    pass

# Serves static resources like css, js, images, etc.
@app.route('/assets/<path:resource>')
def serveStaticResource(resource):
    return send_from_directory('assets/', resource)

if __name__ == "__main__":
    app.run()
