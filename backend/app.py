from flask import Flask, jsonify, render_template, send_from_directory
import requests
from flask_cors import CORS

app = Flask(__name__, static_folder="../frontend", template_folder="../frontend")
CORS(app)

BASE_URL = "https://official-joke-api.appspot.com"

@app.route("/")
def home():
    return send_from_directory("../frontend", "index.html")

@app.route("/api/joke/<joke_type>")
def get_joke(joke_type):
    if joke_type == "random":
        url = f"{BASE_URL}/random_joke"
    else:
        url = f"{BASE_URL}/jokes/{joke_type}/random"
    response = requests.get(url)
    data = response.json()
    # Ensure we always return a single joke object
    if isinstance(data, list) and len(data) > 0:
        data = data[0]
    return jsonify(data)

@app.route("/api/joketypes")
def joke_types():
    url = f"{BASE_URL}/types"
    response = requests.get(url)
    return jsonify(response.json())

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory("../frontend", path)

if __name__ == "__main__":
    app.run(debug=True)