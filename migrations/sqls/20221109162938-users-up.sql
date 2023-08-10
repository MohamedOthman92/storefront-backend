CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY,
    name name,
    phone text,
    address text,
    password text,
    created_at timestamp with time zone
);