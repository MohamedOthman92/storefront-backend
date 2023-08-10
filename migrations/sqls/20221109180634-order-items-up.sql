CREATE TABLE IF NOT EXISTS order_items
(
	id SERIAL PRIMARY KEY,
    orders_id integer REFERENCES orders(id),
    products_id integer REFERENCES products(id),
    quantity integer
);