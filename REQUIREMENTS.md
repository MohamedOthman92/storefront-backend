## API Endpoints

#### Products

- Index
  http://localhost:3000/products (GET)
- Show
  http://localhost:3000/products/:id (GET)
- Create [token required]
  http://localhost:3000/products/ (POST)

#### Users

- Index [token required]
  http://localhost:3000/users (GET)
- Show [token required]
  http://localhost:3000/users (GET)
- Create N[token required]
  http://localhost:3000/users (POST)

#### Orders

- Current Order by user (args: user id)[token required]
  http://localhost:3000/orders/:id

## Data Shapes

#### Product

- id
- name
- description
- price

#### User

- id
- name
- address
- phone
- password

#### Orders

- id
- quantity
- user_id
- total
- complete

#### Order-Products relation

- id
- order_id
- product_id

![ERD](/ERD music_storefront.png)
