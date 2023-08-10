CREATE TABLE IF NOT EXISTS orders
(
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id),
    total money,
    created_at timestamp with time zone,
    complete boolean DEFAULT false
);