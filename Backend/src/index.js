import dotenv from 'dotenv'
import { connectToDb } from './db/index.js'
import { app } from './app.js'


connectToDb()
    .then(() => {
        
        app.listen(3000, () => {
            console.log(`Server is live at ${process.env.PORT}`)
        })
    })