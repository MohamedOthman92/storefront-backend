//@ts-ignore
import Client from "../database"
import { Product } from "./music_storefront";

export type Order = {
    id: Number;
    user_id: Number;
    total: string;
    complete: boolean;
}

export type ProductOrder = {
    id: Number;
    product_id: Number;
    order_id: Number;
    quantity: Number;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
        //@ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM orders;'
        const result = await conn.query(sql)
        conn.release()
        return result.rows
        } catch (err){
            throw new Error (`Cannot get orders list ${err}`)
        }
    }

    async show(id: Number): Promise<Order> {

    try {
    const sql = 'SELECT * FROM orders WHERE id=($1);'
    //@ts-ignore
    const conn = await Client.connect()
    const result = await conn.query(sql, [id])
    conn.release()

    return result.rows[0]

    } catch (err) {
        throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async create(o: Order): Promise<Order> {

      try {

    const sql = `INSERT INTO orders (id, user_id, total, complete) VALUES($1, $2, $3, $4) RETURNING *;`

    //@ts-ignore
    const conn = await Client.connect()
    const result = await conn.query(sql, [o.id, o.user_id, o.total, o.complete])
    const order = result.rows[0]
    conn.release()

    return order

      } catch (err) {
          throw new Error(`Could not add new order ${o.id} for user ${o.user_id}. Error: ${err}`)
      }
  }

  async addItems(po: ProductOrder): Promise<ProductOrder> {

      try {

    const sql = `INSERT INTO order_items (id, product_id, order_id, quantity) VALUES($1, $2, $3, $4) RETURNING *;`

    //@ts-ignore
    const conn = await Client.connect()
    const result = await conn.query(sql, [po.id, po.product_id, po.order_id, po.quantity])
    const order = result.rows[0]
    conn.release()

    return order

      } catch (err) {
          throw new Error(`Could not add new item ${po.id}. Error: ${err}`)
      }
  }



  
  async delete(id: Number): Promise<Order> {
      try {
    const sql = 'DELETE FROM order_items WHERE id=($1)'
    //@ts-ignore
    const conn = await Client.connect()
    const result = await conn.query(sql, [id])
    const order = result.rows[0]
    conn.release()

    return order
      } catch (err) {
          throw new Error(`Could not delete order ${id}. Error: ${err}`)
      }
  }
}