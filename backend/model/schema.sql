CREATE TABLE Users (
    user_id SERIAL,
    email TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL
);

CREATE TABLE Follows (
    follower_id INTEGER references Users(user_id),
    following_id INTEGER references Users(user_id),
    PRIMARY KEY(follower_id, following_id),
    check (follower_id != following_id)
);

CREATE TABLE MovieList (
    user_id INTEGER references Users(user_id),
    list_name TEXT,
    PRIMARY KEY(user_id, list_name) 
);

CREATE TABLE Movies (
    user_id INTEGER NOT NULL references Users(user_id),
    list_name TEXT NOT NULL references MovieList(list_name), 
    movie_id INTEGER NOT NULL,
    PRIMARY KEY(user_id, list_name, movie_id)
);