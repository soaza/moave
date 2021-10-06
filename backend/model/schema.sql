CREATE TABLE database_user (
    user_id SERIAL,
    username TEXT UNIQUE,
    password TEXT,
    PRIMARY KEY(user_id)
);