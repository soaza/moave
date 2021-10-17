CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
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
    user_id INTEGER NOT NULL,
    list_name TEXT NOT NULL,
    movie_id INTEGER NOT NULL,
    FOREIGN KEY (user_id, list_name) references MovieList(user_id, list_name),
    PRIMARY KEY(user_id, list_name, movie_id)
);


INSERT INTO Users values (DEFAULT,'user1@gmail.com', '$2b$10$XShItmRbeoeCEtK0chNZLuRam3y.k6BRz8hKdKMfdLSWu2NMULZvC', 'user1'); /*pw = user1 */
INSERT INTO Users values (DEFAULT,'user2@gmail.com', '$2b$10$99g1brQVF8gXamaFtLe5MeOMC.DWefDfRaDjbXiqdU8mEkhnAAuYy', 'user2'); /*pw = user2 */
INSERT INTO Users values (DEFAULT,'user3@gmail.com', '$2b$10$0.FXRIlQPtpnd/FpTqTXIOG7xcmuF7IDA189CJ1as5lNaw7aasD9i', 'user3'); /*pw = user3 */

INSERT INTO Follows values (1, 2);
INSERT INTO Follows values (1, 3);
INSERT INTO Follows values (2, 3);