//@ts-ignore
import  Client  from "../database";
import bcrypt from 'bcrypt'


//!!!
const {
    BCRYPT_PASSWORD,
    SALTROUNDS,
    pepper
} = process.env

export type User = {
    id: Number;
    name: string;
    address: string;
    phone: string;
    password: string;
}

export class UserStore {
        async index(): Promise<User[]> {
        try {
        //@ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM users'
        const result = await conn.query(sql)
        conn.release()
        return result.rows
        } catch (err){
            throw new Error (`Cannot get users list ${err}`)
        }
    }

    async show(id: string): Promise<User> {

    try {
    const sql = 'SELECT * FROM users WHERE id=($1);'
    //@ts-ignore
    const conn = await Client.connect()
    const result = await conn.query(sql, [id])
    conn.release()

    return result.rows[0]

    } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  async create(u: User): Promise<User> {

      try {

    const sql = 'INSERT INTO users (name, address, phone, password) VALUES($1, $2, $3, $4) RETURNING *;'
    //@ts-ignore
    const conn = await Client.connect()

const hash = bcrypt.hashSync(
    u.password + pepper, 
    parseInt(SALTROUNDS as string)
)
    const result = await conn.query(sql, [u.name, u.address, u.phone, hash])
    const user = result.rows[0]
    conn.release()

    return user

      } catch (err) {
          throw new Error(`Could not add new user ${u.name}. Error: ${err}`)
      }
  }

  async patch(id: string, u: User): Promise<User> {
    try{
        const sql = 'UPDATE users SET name=$2 , address=$3 , phone=$4, password=$5 WHERE id=$1;'
        //@ts-ignore
        const conn = await Client.connect()
        const result = await conn.query(sql, [id, u.name, u.address, u.phone, u.password])
        const product = result.rows[0]
        conn.release()

        return product
        } catch (err) {
          throw new Error(`Could not update user ${id}. Error: ${err}`)
      }
    }

  async delete(id: string): Promise<User> {
      try {
    const sql = 'DELETE FROM users WHERE id=$1;'
    //@ts-ignore
    const conn = await Client.connect()
    const result = await conn.query(sql, [id])
    const product = result.rows[0]
    conn.release()

    return product
      } catch (err) {
          throw new Error(`Could not delete user ${id}. Error: ${err}`)
      }
  }

  async authenticate(name: string, password: string): Promise<User | null> {
    //@ts-ignore
    const conn = await Client.connect()
    const sql = 'SELECT password FROM users WHERE name=($1);'
    const result = await conn.query(sql, [name])
    console.log(password+pepper)

    if (result.rows.length){
        const user = result.rows[0]
        console.log(user)

        if (bcrypt.compareSync(password+pepper, user.password)) {
            return user
        }
    }
    return null
  }
}
