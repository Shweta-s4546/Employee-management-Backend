const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const connectDb = require('./db/connect')

const PORT = process.env.PORT

const app= express()
app.use(express.urlencoded({ extended:true }))
app.use(express.json())

//external middeleware
app.use(cors())

//routes
app.use(`/api/admin`, require('./route/adminRoute'))
app.use(`/api/employee`, require('./route/employeeRoute'))


//path not found
app.all(`/**`, (req,res) => {
    return res.status(404).json({ msg : "requested path not found"})
})

//server listen
app.listen(PORT, async () => {
    console.log(`server started @ http://localhost:${PORT}`)
    await connectDb()
})