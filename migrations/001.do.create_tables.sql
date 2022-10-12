CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    membership TEXT,
    created_date TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    sub TEXT
);

CREATE TABLE bottles (
    upc bigint UNIQUE PRIMARY KEY,
    brand TEXT NOT NULL,
    year INTEGER,
    category INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    size TEXT,
    msrp bigint,
    bottle_desc TEXT,
    thumbnail TEXT,
    notes TEXT
);

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    bottle_id bigint REFERENCES bottles(upc) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) on DELETE CASCADE,
    rating INTEGER,
    paid bigint,
    purchase_loc TEXT,
    demand INTEGER,
    year_bottled INTEGER,
    qty INTEGER NOT NULL,
    added_date TIMESTAMP DEFAULT now() NOT NULL
);