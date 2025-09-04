import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './db/db.js'
dotenv.config()
import movieRoutes from "./routes/movies.js"
import authRoutes from "./routes/auth.js"
import path from 'path'


const app = express()
app.use(cors())
app.use(express.json())

app.use("/uploads", express.static("public/uploads"));

app.use("/movies", movieRoutes)
app.use("/users", authRoutes)

const PORT = process.env.PORT || 5000
connectDb()
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})