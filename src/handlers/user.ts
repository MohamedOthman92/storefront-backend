import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt, { Secret } from 'jsonwebtoken'

const store = new UserStore() 

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
   const users = await store.show(req.body.id)
   res.json(users)
}

const create = async (req: Request, res: Response) => {
    //@ts-ignore
        const user: User = {
            name: req.body.name,
            password: req.body.password
        }

    try {
    const newUser = await store.create(user)

    let token = jwt.sign({user: newUser}, process.env.TOCKEN_SECRET as Secret )
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const update = async (req: Request, res: Response) => {
    //@ts-ignore
    const user: User = {
        id: parseInt(req.params.id),
        name: req.body.username,
        password: req.body.password,
    }
    try {
        const authorizationHeader = req.headers.authorization
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret)
        //@ts-ignore
        if(decoded.id !== user.id) {
            throw new Error('User id does not match!')
        }
    } catch(err) {
        res.status(401)
        res.json(err)
        return
    }

    try {
        const updated = await store.create(user)
        res.json(updated)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (_req: Request, res: Response) => {
    //@ts-ignore
  const user: User = {
    name: _req.body.name,
    password: _req.body.password,
  }
  try {
      const u = await store.authenticate(user.name, user.password)
      var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as Secret);
      res.json(token)
  } catch(err) {
      res.status(401)
      res.json({err})
  }
}

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
    try {
        const authorizationHeader = req.headers.authorization
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret) 

        next()
    } catch (error) {
        res.status(401)
    }
}

const music_user_routs = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', create)
    app.delete('/users/:id', verifyAuthToken, destroy)
    app.post('/users/authenticate', authenticate)
    app.put('/users/:id', update)
}

export default music_user_routs