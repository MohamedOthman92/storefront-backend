import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import music_storefront_routs from './handlers/music_storefront'
import music_user_routs from './handlers/user'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
app.use(cors())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

music_storefront_routs(app)
music_user_routs(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})