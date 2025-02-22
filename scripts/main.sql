DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'admin') THEN
      CREATE USER admin WITH PASSWORD 'sigma';
   END IF;
END
$$;

ALTER USER admin WITH SUPERUSER;

CREATE TABLE IF NOT EXISTS profile (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- could try SERIAL, autogenerated adds 1, let DB control, avoid touching, unique identifier
    name VARCHAR(100) NOT NULL, -- varchar = text column that has a constraint on size
    email VARCHAR(255) NOT NULL UNIQUE, -- Ensures no duplicate emails
    username VARCHAR(50) NOT NULL UNIQUE, -- Ensures no duplicate usernames
    password TEXT NOT NULL -- design choice: storing password here is kinda iffy, fine for MVP
);

CREATE TABLE IF NOT EXISTS farm (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    profile_id INT NOT NULL,

    CONSTRAINT fk_farm_profile_id
        FOREIGN KEY (profile_id)
        REFERENCES profile(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
); -- each single farm will have many water areas, many cows, many bulls, etc

CREATE TABLE IF NOT EXISTS cow(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255), -- design choice: do we want to require this to be not null?
    notes TEXT,
    farm_id INT NOT NULL,

    CONSTRAINT fk_cow_farm_id
        FOREIGN KEY (farm_id)
        REFERENCES farm(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
-- Another design choice: do we want bull as different table? store the type in the cow table? rename cow to cow tracker?

CREATE TABLE IF NOT EXISTS location_ping(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    latitude DECIMAL(9, 6) NOT NULL,  -- Latitude for the cow's location
    longitude DECIMAL(9, 6) NOT NULL,  -- Longitude for the cow's location
    recorded_at TIMESTAMP NOT NULL DEFAULT NOW(), -- Timestamp for when the location was recorded
    cow_id INT NOT NULL,

    CONSTRAINT fk_location_ping_cow_id
        FOREIGN KEY (cow_id)
        REFERENCES cow(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO profile (name, email, username, password) VALUES
('Kevin', 'xu.kev@northeastern.edu', 'kevuhh', 'hashed_password1'),
('Dailor', 'dailor@dailor.edu', 'dmoney', 'hashed_password2'),
('Alice', 'alice@farmlife.com', 'alice123', 'hashed_password3'),
('Bob', 'bob@farmlife.com', 'bobbyfarms', 'hashed_password4');

INSERT INTO farm (name, profile_id) VALUES
('The Best Farm', 1),
('Dailor''s Super Farm', 2), -- escape apostrophe with double single quote
('Alice''s Green Acres', 3),
('Bob''s Ranch', 4);

INSERT INTO cow (name, notes, farm_id) VALUES
('Bessie', 'Brown cow, calm temperament', 1),
('MooMoo', 'Very energetic', 1),
('Daisy', 'Loves to roam', 2),
('Spot', 'Always near the water', 3),
('Buttercup', 'Top milk producer', 4);

-- Cows' locations over time
INSERT INTO location_ping (latitude, longitude, cow_id) VALUES
(40.712776, -74.005974, 1), -- Bessie location 1
(40.712676, -74.005874, 1), -- Bessie location 2
(40.712576, -74.005774, 1), -- Bessie location 3
(34.052235, -118.243683, 2), -- MooMoo location 1
(34.052335, -118.243783, 2), -- MooMoo location 2
(36.778259, -119.417931, 3), -- Daisy location 1
(36.778159, -119.417831, 3), -- Daisy location 2
(37.774929, -122.419418, 4), -- Spot location 1
(37.775029, -122.419518, 4), -- Spot location 2
(39.739236, -104.990251, 5); -- Buttercup location 1




