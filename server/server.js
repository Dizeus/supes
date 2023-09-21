const PORT = process.env.PORT ?? 8000;
const express = require('express')
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')
const root = path.join(__dirname, '../client', 'build')
const heroController = require('./controllers/heroesController')
const errorHandler = require('./middleware/ErrorHandleMiddleware')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(root));
app.use(express.static(path.resolve(__dirname, 'static')))
if(process.env.NODE_ENV == "production"){
    app.use(express.static(root))
}
app.use(fileUpload({}))
app.use(errorHandler)

app.get('/api/heroes', heroController.getAllHeroes)
app.post('/api/heroes', heroController.addHero)
app.put('/api/heroes/:id', heroController.editHero)
app.delete('/api/heroes/:id', heroController.deleteHero)

app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})
app.listen(PORT, ()=>console.log(`Server Running on PORT ${PORT}`))