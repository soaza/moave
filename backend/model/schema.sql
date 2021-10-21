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

-- CREATE TABLE MovieList (
--     user_id INTEGER references Users(user_id),
--     list_name TEXT,
--     PRIMARY KEY(user_id, list_name) 
-- );

-- CREATE TABLE Movies (
--     user_id INTEGER NOT NULL,
--     list_name TEXT NOT NULL,
--     movie_id INTEGER NOT NULL,
--     FOREIGN KEY (user_id, list_name) references MovieList(user_id, list_name),
--     PRIMARY KEY(user_id, list_name, movie_id)
-- );

CREATE TABLE Groups (
    group_id SERIAL PRIMARY KEY,
    group_name TEXT UNIQUE NOT NULL,
    admin_id INTEGER references Users(user_id)
);

CREATE TABLE UserGroups (
    user_id INTEGER references Users(user_id),
    group_id INTEGER references Groups(group_id),
    PRIMARY KEY(user_id, group_id)
);

-- lists for activity
CREATE TABLE ActivityList(
    user_id INTEGER references Users(user_id),
    movie_id INTEGER NOT NULL,
    activity_type TEXT NOT NULL,
    check (activity_type in ('COMPLETED', 'WATCHLIST', 'CURRENT')),
    PRIMARY KEY (user_id, movie_id)
);


-- trigger and function set for group creation
CREATE OR REPLACE FUNCTION update_userGroups_on_create_func() RETURNS TRIGGER
AS $$ 
BEGIN
    INSERT INTO UserGroups(user_id, group_id) VALUES (NEW.admin_id, NEW.group_id);
    RETURN NULL; 
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER userGroups_create_trigger
AFTER INSERT ON Groups
FOR EACH ROW EXECUTE PROCEDURE update_userGroups_on_create_func();


-- trigger and function set for group deletion
CREATE OR REPLACE FUNCTION update_userGroups_on_delete_func() RETURNS TRIGGER
AS $$ 
BEGIN
    DELETE FROM UserGroups WHERE group_id = OLD.group_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER userGroups_delete_trigger
BEFORE DELETE ON Groups
FOR EACH ROW EXECUTE PROCEDURE update_userGroups_on_delete_func();

-- Sample data
INSERT INTO Users values (DEFAULT,'user1@gmail.com', '$2b$10$XShItmRbeoeCEtK0chNZLuRam3y.k6BRz8hKdKMfdLSWu2NMULZvC', 'user1'); /*pw = user1 */
INSERT INTO Users values (DEFAULT,'user2@gmail.com', '$2b$10$99g1brQVF8gXamaFtLe5MeOMC.DWefDfRaDjbXiqdU8mEkhnAAuYy', 'user2'); /*pw = user2 */
INSERT INTO Users values (DEFAULT,'user3@gmail.com', '$2b$10$0.FXRIlQPtpnd/FpTqTXIOG7xcmuF7IDA189CJ1as5lNaw7aasD9i', 'user3'); /*pw = user3 */

INSERT INTO Follows values (1, 2);
INSERT INTO Follows values (1, 3);
INSERT INTO Follows values (2, 3);

INSERT INTO Groups values (DEFAULT, 'MARVEL', 1);
INSERT INTO UserGroups values (2, 1);

INSERT INTO ActivityList values (1, 580489, 'COMPLETED');
INSERT INTO ActivityList values (1, 610253, 'WATCHLIST');
INSERT INTO ActivityList values (1, 335983, 'CURRENT');
