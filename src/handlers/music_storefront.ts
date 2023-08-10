import express, { Request, Response } from 'express'
import { Product, MusicStore } from '../models/music_storefront'
import jwt, { Secret } from 'jsonwebtoken'


const store = new MusicStore() 

const index = async (_req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
   const product = await store.show(req.body.id)
   res.json(product)
}

const create = async (req: Request, res: Response) => {
    const product: Product = {
            //@ts-ignore
            id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        }
    try {
    const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
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

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}



const music_storefront_routs = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
    app.delete('/products', verifyAuthToken, destroy)
}

export default music_storefront_routs