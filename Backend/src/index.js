import dotenv from 'dotenv'
import { connectToDb } from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path: './.env'
})

const port=10000

connectToDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is live at ${port}`)
        })
    })