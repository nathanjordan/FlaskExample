# FlaskExample <img src="http://files.softicons.com/download/application-icons/free-developer-icons-by-designkode/png/32/flask.png"/>

A Flask example to show posting to a REST interface with a MongoDB Backend

## Get FlaskExample

Move to a directory where you'd like to have the example placed and execute the following command

<pre>git clone https://github.com/nathanjordan/FlaskExample.git</pre>

## Dependencies

You will need to have a few different things for this to work

1. Python 2.7.x
2. MongoDB
3. Flask
4. pymongo
5. A browser that doesn't suck

#### Check Python & MongoDB

Check your python version with

<pre>python --version</pre>

Install MongoDB

<pre>sudo apt-get -y install mongodb</pre>

#### Install Flask & pymongo

Ensure you have pip installed

<pre>sudo apt-get -y install python-pip</pre>

Then install the python packages

<pre>sudo pip install Flask pymongo</pre>

## Usage

To run the server, simply cd into the FlaskExample directory and run <code>server.py</code> like so

<pre>python server.py</pre>

And you should see the following

<pre>
 * Running on http://127.0.0.1:5000/
 * Restarting with reloader
</pre>

Then navigate to <code>http://127.0.0.1:5000/</code> in your browser that doesn't suck, and it should work

### Enjoy!

<img src="http://mrwgifs.com/wp-content/uploads/2013/06/Spongebob-Rainbow-Of-Imagination-Reaction-Gif.gif"/>
