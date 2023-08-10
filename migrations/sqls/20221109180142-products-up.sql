CREATE TABLE IF NOT EXISTS products
(
    id SERIAL PRIMARY KEY,
    name name,
    description text,
    price money
);