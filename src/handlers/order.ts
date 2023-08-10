import express, { Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import {Order, OrderStore, ProductOrder } from '../models/order'


const storeOrders = new OrderStore() 

const index = async (_req: Request, res: Response) => {
    const order = await storeOrders.index()
    res.json(order)
}

const show = async (req: Request, res: Response) => {
   const thisOrder = await storeOrders.show(req.body.id)
   res.json(thisOrder)
}

const create = async (req: Request, res: Response) => {
    const order: Order = {
            //@ts-ignore
            id: req.params.id,
            quantity: req.body.quantity,
            user_id: req.body.user_id,
            total: req.body.total,
            complete: req.body.complete,
            product_id: req.body
        }
    try {
    const newOrder = await storeOrders.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const addItems = async (req: Request, res: Response) => {
    const orderItem: ProductOrder = {
            //@ts-ignore
            id: req.params.id,
            quantity: req.body.quantity,
            user_id: req.body.user_id,
            total: req.body.total,
            complete: req.body.complete,
            product_id: req.body
        }
    try {
    const newOrderAdd = await storeOrders.addItems(orderItem)
        res.json(newOrderAdd)
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
    const deleted = await storeOrders.delete(req.body.id)
    res.json(deleted)
}





const orders_storefront_routs = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', verifyAuthToken, create)
    app.post('/orders', verifyAuthToken, addItems)
    app.delete('/orders', verifyAuthToken, destroy)
}

export default orders_storefront_routs