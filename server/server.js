const PORT = process.env.PORT ?? 8000;
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const pool = require('./db')
const path = require('path')
const root = path.join(__dirname, '../client', 'build')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(root));

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, '../client/build')))
}

app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})
app.listen(PORT, ()=>console.log(`Server Running on PORT ${PORT}`))