# Moave

*each step begins from the root of the repository*

## Starting the Front-End locally
*Prerequisite: NPM installed*
1) Navigate to the front-end folder
```
cd frontend
```

2) Install the required packages
```
npm install
```

3) Launch the frontend on localhost port 3000!
```
npm start
```

## Creating the database locally
*Prerequisite: PostgreSQL installed*
1) Create a database called 'moave'
```
createdb moave
```

2) Log in to database
```
psql moave
```

3) Populate the database
Copy all lines of code in schema.sql on our back-end repository(`/backend/model/schema.sql`). 
Paste the lines in the postgres terminal and run it, you should see the below messages in the terminal:
```
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE FUNCTION
CREATE TRIGGER
CREATE FUNCTION
CREATE TRIGGER
```

## Starting the Back-End locally
1) Navigate to the back-end folder
```
cd backend
```

2) Install the required packages
```
npm install
```

3) Launch the backend on port 3002!
```
nodemon server.js
```
You should see the message:
`app is running on port 3002`

## Starting the Movie-Recommender Service locally
1) Navigate to the movie-recommender service folder
```
cd movie-recommender-service
```

2) Install the required packages
```
pip install -r requirements.txt
```
If the above command does not work try 
```
pip3 install -r requirements.txt
```

3) Launch the service on localhost port 5000!
```
FLASK_APP=app.py FLASK_ENV=development flask run
```

## Things to note
1) Many of the endpoints require API Keys to work, and we stored them in .env files on the back-end. However, we did not commit these files to the repository as it is not a good practice. Do contact us if you require these env files.
2) While the front-end and back-end can start without the movie-recommender service(no strong dependencies), it is advised that the movie-recommender service is started locally as well to make full use of all the endpoints.
3) It is neccessary to populate the database before calling the endpoints in the backend, calling the endpoints without the database set up would cause it to fail.

