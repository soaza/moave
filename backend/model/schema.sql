CREATE TABLE User (
    user_id SERIAL,
    display_name TEXT UNIQUE NOT NULL,
    email TEXT,
    password TEXT NOT NULL,
    PRIMARY KEY(email)
);

CREATE TABLE Follows (
    follower_id INTEGER references User(user_id),
    following_id INTEGER references User(user_id),
    PRIMARY KEY(follower_id, following_id),
    check (follower_id != following_id)
);

CREATE TABLE MovieList (
    user_id INTEGER references User(user_id),
    list_name TEXT,
    PRIMARY KEY(user_id, list_name) 
);

CREATE TABLE Movies (
    user_id INTEGER NOT NULL references User(user_id),
    list_name TEXT NOT NULL references MovieList(list_name), 
    movie_id INTEGER NOT NULL,
    PRIMARY KEY(user_id, list_name, movie_id)
);