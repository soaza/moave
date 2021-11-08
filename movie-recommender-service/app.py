from flask import Flask, jsonify, request
from script import recommend_movie

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello World!"


@app.route('/get_movie_recommendation', methods=['GET'])
def get_movie_recommendation():
    movie_title = request.args.get("movie_title")
    movies_recommended = recommend_movie(movie_title)
    return jsonify({'movies':movies_recommended}), 200

# Run with:
# FLASK_APP=app.py FLASK_ENV=development flask run