CREATE TABLE members(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(15) NOT NULL,
    last_name VARCHAR(24) NOT NULL,
    password_digest VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    phone INT UNIQUE NOT NULL,
    current BOOLEAN,
    dob DATE NOT NULL
);