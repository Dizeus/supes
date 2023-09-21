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

app.get('/api/heroes', async (req, res)=>{
    try{
        const heroes = await pool.query(`SELECT * FROM heroes`);
        res.json(heroes.rows)
    }catch (error){
        console.error(error)
    }
})

app.post('/api/heroes', async (req, res)=>{
    const {nickname, real_name, origin, superpowers, phrase, images} = req.body
    const id = uuidv4()
    try{
        const newHero = await pool.query(`INSERT INTO heroes(id, nickname, real_name, origin, superpowers, phrase, images) VALUES($1,$2,$3,$4,$5,$6,$7)`, [id, nickname, real_name, origin, superpowers, phrase, images]);
        res.json(newHero)
    }catch (error){
        console.error(error)
    }
})

app.put('/api/heroes/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        const {nickname, real_name, origin, superpowers, phrase, images} = req.body
        const updatedHero = await pool.query(`UPDATE heroes SET nickname = $1, real_name  = $2, origin = $3, superpowers = $4, phrase = $5, images = $6 WHERE id = $7;`, [nickname, real_name, origin, superpowers, phrase, images, id]);
        res.json(updatedHero)
    }catch (error){
        console.error(error)
    }
})
app.delete('/api/heroes/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        const del = await pool.query(`DELETE FROM heroes WHERE id = $1;`, [id]);
        res.json(del)
    }catch (error){
        console.error(error)
    }
})

app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})
app.listen(PORT, ()=>console.log(`Server Running on PORT ${PORT}`))